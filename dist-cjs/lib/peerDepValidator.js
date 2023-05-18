"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePeerDependencyRangeSatisfied = exports.validatePeerDependencies = exports.enforceValidPeerDependencies = exports.envarSpecs = void 0;
const tslib_1 = require("tslib");
const dindist_1 = tslib_1.__importDefault(require("dindist"));
const kleur_1 = tslib_1.__importDefault(require("kleur"));
const Semver = tslib_1.__importStar(require("semver"));
const debugNexusPrisma_1 = require("../helpers/debugNexusPrisma");
const utils_1 = require("../helpers/utils");
const diagnostic_1 = require("./diagnostic");
const packageManager_1 = require("./packageManager");
exports.envarSpecs = {
    NO_PEER_DEPENDENCY_CHECK: {
        name: `NO_PEER_DEPENDENCY_CHECK`,
        values: ['true', '1'],
    },
    PEER_DEPENDENCY_CHECK: {
        name: `PEER_DEPENDENCY_CHECK`,
        values: ['false', '0'],
    },
};
//prettier-ignore
const prettyPrintedDisableGuide = '\n\n' + (0, dindist_1.default) `
  You can disable this peer dependency check by setting one of two environment variables. Their specs are:

    ${exports.envarSpecs.NO_PEER_DEPENDENCY_CHECK.name} = ${exports.envarSpecs.NO_PEER_DEPENDENCY_CHECK.values.map(_ => `'${_}'`).join(` | `)}
    ${exports.envarSpecs.PEER_DEPENDENCY_CHECK.name}    = ${exports.envarSpecs.PEER_DEPENDENCY_CHECK.values.map(_ => `'${_}'`).join(` | `)}

  Examples:

    NO_PEER_DEPENDENCY_CHECK='true'
    NO_PEER_DEPENDENCY_CHECK='1'
    PEER_DEPENDENCY_CHECK='false'
    PEER_DEPENDENCY_CHECK='0'
`;
function enforceValidPeerDependencies({ packageJson }) {
    var _a, _b;
    if (exports.envarSpecs.NO_PEER_DEPENDENCY_CHECK.values.includes((_a = process.env[exports.envarSpecs.NO_PEER_DEPENDENCY_CHECK.name]) !== null && _a !== void 0 ? _a : ''))
        return;
    if (exports.envarSpecs.PEER_DEPENDENCY_CHECK.values.includes((_b = process.env[exports.envarSpecs.PEER_DEPENDENCY_CHECK.name]) !== null && _b !== void 0 ? _b : ''))
        return;
    (0, debugNexusPrisma_1.d)('validating peer dependencies');
    const failure = validatePeerDependencies({ packageJson });
    if (failure) {
        console.error(failure.message);
        if ('error' in failure) {
            console.error(failure.error);
        }
        if (failure.kind === 'peer_dep_not_installed') {
            process.exit(1);
        }
    }
}
exports.enforceValidPeerDependencies = enforceValidPeerDependencies;
/**
 * Check that the given package's peer dependency requirements are met.
 *
 * When envar skipping enabled then:
 *
 * 1. NO-op if PEER_DEPENDENCY_CHECK envar is set to false or 0
 * 2. NO-op if NO_PEER_DEPENDENCY_CHECK envar is set to true or 1
 */
function validatePeerDependencies({ packageJson }) {
    var _a, _b, _c;
    try {
        const peerDependencies = (_a = packageJson['peerDependencies']) !== null && _a !== void 0 ? _a : [];
        for (const [peerDepName, _] of Object.entries(peerDependencies)) {
            if (((_c = (_b = packageJson['peerDependenciesMeta']) === null || _b === void 0 ? void 0 : _b[peerDepName]) === null || _c === void 0 ? void 0 : _c.optional) === true) {
                continue;
            }
            const failure = validatePeerDependencyRangeSatisfied({
                peerDependencyName: peerDepName,
                requireer: packageJson,
            });
            if (failure)
                return failure;
        }
    }
    catch (error) {
        const code = `unexpected_error`;
        return {
            kind: code,
            message: (0, diagnostic_1.renderWarning)({
                title: `Something went wrong while trying to validate peer dependencies`,
                code,
                reason: error instanceof Error ? error.message : String(error),
                consequence: `There seems to be a bug so the regular correctness checks of the peer dep checker cannot be carried out now. You are on your own.`,
                solution: `Please report this issue.`,
                disable: prettyPrintedDisableGuide,
            }),
            error,
        };
    }
    return null;
}
exports.validatePeerDependencies = validatePeerDependencies;
function validatePeerDependencyRangeSatisfied({ peerDependencyName, requireer, }) {
    var _a, _b;
    let pdPackageJson;
    try {
        // Use the Node dep lookup algorithm
        // eslint-disable-next-line
        pdPackageJson = require(`${peerDependencyName}/package.json`);
    }
    catch (error) {
        if (!(0, utils_1.isModuleNotFoundError)(error)) {
            return {
                kind: 'peer_dep_package_json_read_error',
                message: `Peer dependency check found ${peerDependencyName} requried by ${(_a = requireer.name) !== null && _a !== void 0 ? _a : '<undefined>'} to be installed but encountered an error while reading its package.json.`,
                error,
            };
        }
        const code = 'peer_dep_not_installed';
        return {
            kind: code,
            message: (0, diagnostic_1.renderError)({
                title: `Peer dependency validation check failed.`,
                // prettier-ignore
                reason: (0, dindist_1.default) `${kleur_1.default.green(peerDependencyName)} is a peer dependency required by ${renderPackageJsonField(requireer, 'name')}. But you have not installed it into this project yet.`,
                code,
                // prettier-ignore
                solution: `Please run \`${kleur_1.default.green((0, packageManager_1.renderAddDeps)((0, packageManager_1.detectProjectPackageManager)(), [peerDependencyName]))}\`.`,
                disable: prettyPrintedDisableGuide,
                consequence: `Your project may not work correctly.`,
            }),
        };
    }
    const pdVersion = pdPackageJson.version;
    const pdVersionRangeSupported = (_b = requireer.peerDependencies) === null || _b === void 0 ? void 0 : _b[peerDependencyName];
    // npm enforces that package manifests have a valid "version" field so this
    // case _should_ never happen under normal circumstances.
    if (!pdVersion) {
        const code = 'peer_dep_package_json_invalid';
        return {
            kind: code,
            message: (0, diagnostic_1.renderWarning)({
                title: `Peer dependency validation check failed unexpectedly.`,
                // prettier-ignore
                reason: `${renderPackageJsonField(requireer, 'name')} requires peer dependency ${renderPackageJsonField(pdPackageJson, 'name')}. No version info for ${renderPackageJsonField(pdPackageJson, 'name')} could be found in its package.json thus preventing a check if its version satisfies the peer dependency version range.`,
                consequence: `Peer dep validator checks cannot be carried out so you are on your own.`,
                disable: prettyPrintedDisableGuide,
                code,
            }),
        };
    }
    if (!pdVersionRangeSupported) {
        const code = `unknown`;
        console.warn((0, diagnostic_1.renderWarning)({
            title: `Peer dependency validation check failed unexpectedly.`,
            // prettier-ignore
            reason: `${renderPackageJsonField(requireer, 'name')} apparently requires peer dependency ${renderPackageJsonField(pdPackageJson, 'name')} yet ${renderPackageJsonField(pdPackageJson, 'name')} is not listed in the peer dependency listing of ${renderPackageJsonField(requireer, 'name')}.`,
            consequence: `There seems to be a bug so the regular correctness checks of the peer dep checker cannot be carried out now. You are on your own. Please report this issue.`,
            disable: prettyPrintedDisableGuide,
            code,
        }));
        return null;
    }
    if (Semver.satisfies(pdVersion, pdVersionRangeSupported)) {
        return null;
    }
    return {
        kind: 'peer_dep_invalid_version',
        message: (0, diagnostic_1.renderWarning)({
            title: `Peer dependency validation check failed`,
            // prettier-ignore
            reason: `${renderPackageJsonField(requireer, 'name')}@${renderPackageJsonField(requireer, 'version')} does not officially support ${renderPackageJsonField(pdPackageJson, 'name')}@${renderPackageJsonField(pdPackageJson, 'version')}. The officially supported range is: \`${pdVersionRangeSupported}\`.`,
            consequence: `This could lead to undefined behaviors and bugs.`,
            disable: prettyPrintedDisableGuide,
            code: `peer_dep_invalid_version`,
        }),
    };
}
exports.validatePeerDependencyRangeSatisfied = validatePeerDependencyRangeSatisfied;
function renderPackageJsonField(packageJson, fieldName) {
    return kleur_1.default.yellow(packageJson[fieldName] === undefined ? `<${fieldName} is undefined>` : String(packageJson[fieldName]));
}
//# sourceMappingURL=peerDepValidator.js.map