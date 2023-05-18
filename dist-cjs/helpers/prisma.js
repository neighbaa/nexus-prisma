"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientDmmf = void 0;
const tslib_1 = require("tslib");
const dindist_1 = tslib_1.__importDefault(require("dindist"));
const kleur_1 = tslib_1.__importDefault(require("kleur"));
const ono_1 = tslib_1.__importDefault(require("ono"));
const util_1 = require("util");
const packageManager_1 = require("../lib/packageManager");
const debugNexusPrisma_1 = require("./debugNexusPrisma");
const errorMessages_1 = require("./errorMessages");
/**
 * Given a package loader, attempt to get the Prisma Client DMMF.
 *
 * @remarks Only the given require function is truly import, the rest is used for better error messages.
 *
 *          This function is designed to support working with bundlers. Specifically `ncc` has been
 *          tested.
 *
 *          This function intentionally does not do the `require`/`import` itself, leaving that to
 *          upstream code to handle in static ways that bundlers will be able to process.
 */
const getPrismaClientDmmf = (packageLoader) => {
    var _a, _b;
    (0, debugNexusPrisma_1.d)('get dmmf from @prisma/client');
    let prismaClientPackage;
    // prettier-ignore
    const printedImportId = `${kleur_1.default.yellow(packageLoader.importId)} (resolved as ${packageLoader.importIdResolved})`;
    try {
        // eslint-disable-next-line
        prismaClientPackage = packageLoader.require();
    }
    catch (error) {
        // prettier-ignore
        throw (0, ono_1.default)(error, (0, dindist_1.default) `
      Failed to get Prisma Client DMMF. An error occured while trying to import it from ${printedImportId}.
    `);
    }
    if (!(typeof prismaClientPackage === 'object' && prismaClientPackage !== null)) {
        // prettier-ignore
        throw new Error((0, dindist_1.default) `
      Failed to get Prisma Client DMMF. It was imported from ${printedImportId} but was not the expected type. Got:

      ${(0, util_1.inspect)(prismaClientPackage)}
    `);
    }
    const prismaClientPackageObject = prismaClientPackage;
    // eslint-disable-next-line
    if (!((_a = prismaClientPackageObject.Prisma) === null || _a === void 0 ? void 0 : _a.dmmf)) {
        // prettier-ignore
        throw new Error((0, dindist_1.default) `
      Failed to get Prisma Client DMMF. It was imported from ${printedImportId} but did not contain "dmmf" data. Got:

      ${(0, util_1.inspect)(prismaClientPackage)}

      This usually means that you need to run Prisma Client generation. Please run ${(0, packageManager_1.renderRunBin)((0, packageManager_1.detectProjectPackageManager)(), `prisma generate`)}.
      If that does not solve your problem, you can get community help by opening a discussion at ${kleur_1.default.yellow(errorMessages_1.GITHUB_NEW_DISCUSSION_LINK)}.
    `);
    }
    // Simple duck type to sanity check we got good data at runtime.
    const dmmf = (_b = prismaClientPackageObject.Prisma) === null || _b === void 0 ? void 0 : _b.dmmf;
    const expectedFields = ['datamodel', 'schema', 'mappings'];
    if (expectedFields.find((fieldName) => dmmf[fieldName] && typeof dmmf[fieldName] !== 'object')) {
        throw new Error((0, dindist_1.default) `
      The DMMF imported from ${packageLoader.importId} appears to be invalid. Missing one/all of expected fields: 
    `);
    }
    return dmmf;
};
exports.getPrismaClientDmmf = getPrismaClientDmmf;
//# sourceMappingURL=prisma.js.map