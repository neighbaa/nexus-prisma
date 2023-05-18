"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserGentimeSettings = exports.supportedSettingsModulePaths = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const kleur_1 = tslib_1.__importDefault(require("kleur"));
const debugNexusPrisma_1 = require("../../../helpers/debugNexusPrisma");
const diagnostic_1 = require("../../../lib/diagnostic");
exports.supportedSettingsModulePaths = [
    'nexus-prisma.ts',
    'nexusPrisma.ts',
    'nexus_prisma.ts',
    'prisma/nexus-prisma.ts',
    'prisma/nexusPrisma.ts',
    'prisma/nexus_prisma.ts',
];
function loadUserGentimeSettings() {
    const relativeToPath = process.cwd();
    const userSettingsModulePaths = exports.supportedSettingsModulePaths
        .map((relativePath) => `${relativeToPath}/${relativePath}`)
        .filter((absolutePath) => fs.existsSync(absolutePath));
    const userSettingsModulePath = userSettingsModulePaths[0];
    // TODO
    // if (userSettingsModulePaths.length > 1) {
    //   console.log(
    //     // prettier-ignore
    //     renderWarning({
    //       code: `nexus_prisma_multiple_configuration_files`,
    //       title: `Found multiple configuration files`,
    //       reason: `Nexus Prisma looks for an optional configuration file in the following places: ${supportedSettingsModulePaths.join(', ')}. You can only have zero or one of these files present, but you had multiple: ${userSettingsModulePaths.map((_) => Path.relative(relativeToPath, _)).join(', ')}.`,
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- We know there are multiple in this branch so a first must have been found.
    //       consequence: `Nexus Prisma is only looking at ${Path.relative(relativeToPath, userSettingsModulePath!)} and ignoring all others.`,
    //       solution: `Remove all or but one of the configuration files.`
    //     })
    //   )
    // }
    if (userSettingsModulePath) {
        // Now that we know a TS config file is present, try loading ts-node
        let tsNode;
        try {
            // eslint-disable-next-line
            tsNode = require('ts-node');
        }
        catch (error) {
            const nexusPrisma = `${kleur_1.default.yellow(`nexus-prisma`)}`;
            const tsNode = `${kleur_1.default.yellow(`ts-node`)}`;
            console.log((0, diagnostic_1.renderError)({
                code: 'nexus_prisma_ts_node_import',
                title: `Failed to read configuration module`,
                reason: `${nexusPrisma} uses ${tsNode} to read your generator configuration module, but there was an error while trying to import ${tsNode}: ${error instanceof Error ? error.message : String(error)}`,
                consequence: `${nexusPrisma} will stop generation.`,
                solution: `Fix the ${tsNode} import error (missing dependency?) or stop using ${nexusPrisma} generator configuration module.`,
            }));
            throw error;
        }
        // eslint-disable-next-line
        tsNode.register({
            compilerOptions: {
                module: 'commonjs',
            },
        });
        // Load the user's settings module for side-effects against the setset instance.
        (0, debugNexusPrisma_1.d)(`Loaded configuration from ${userSettingsModulePath}`);
        require(userSettingsModulePath);
    }
}
exports.loadUserGentimeSettings = loadUserGentimeSettings;
//# sourceMappingURL=loader.js.map