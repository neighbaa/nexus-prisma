import dedent from 'dindist';
import kleur from 'kleur';
import ono from 'ono';
import { inspect } from 'util';
import { detectProjectPackageManager, renderRunBin } from '../lib/packageManager';
import { d } from './debugNexusPrisma';
import { GITHUB_NEW_DISCUSSION_LINK } from './errorMessages';
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
export const getPrismaClientDmmf = (packageLoader) => {
    var _a, _b;
    d('get dmmf from @prisma/client');
    let prismaClientPackage;
    // prettier-ignore
    const printedImportId = `${kleur.yellow(packageLoader.importId)} (resolved as ${packageLoader.importIdResolved})`;
    try {
        // eslint-disable-next-line
        prismaClientPackage = packageLoader.require();
    }
    catch (error) {
        // prettier-ignore
        throw ono(error, dedent `
      Failed to get Prisma Client DMMF. An error occured while trying to import it from ${printedImportId}.
    `);
    }
    if (!(typeof prismaClientPackage === 'object' && prismaClientPackage !== null)) {
        // prettier-ignore
        throw new Error(dedent `
      Failed to get Prisma Client DMMF. It was imported from ${printedImportId} but was not the expected type. Got:

      ${inspect(prismaClientPackage)}
    `);
    }
    const prismaClientPackageObject = prismaClientPackage;
    // eslint-disable-next-line
    if (!((_a = prismaClientPackageObject.Prisma) === null || _a === void 0 ? void 0 : _a.dmmf)) {
        // prettier-ignore
        throw new Error(dedent `
      Failed to get Prisma Client DMMF. It was imported from ${printedImportId} but did not contain "dmmf" data. Got:

      ${inspect(prismaClientPackage)}

      This usually means that you need to run Prisma Client generation. Please run ${renderRunBin(detectProjectPackageManager(), `prisma generate`)}.
      If that does not solve your problem, you can get community help by opening a discussion at ${kleur.yellow(GITHUB_NEW_DISCUSSION_LINK)}.
    `);
    }
    // Simple duck type to sanity check we got good data at runtime.
    const dmmf = (_b = prismaClientPackageObject.Prisma) === null || _b === void 0 ? void 0 : _b.dmmf;
    const expectedFields = ['datamodel', 'schema', 'mappings'];
    if (expectedFields.find((fieldName) => dmmf[fieldName] && typeof dmmf[fieldName] !== 'object')) {
        throw new Error(dedent `
      The DMMF imported from ${packageLoader.importId} appears to be invalid. Missing one/all of expected fields: 
    `);
    }
    return dmmf;
};
//# sourceMappingURL=prisma.js.map