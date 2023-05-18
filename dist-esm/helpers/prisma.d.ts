/// <reference types="node" />
import { DMMF } from '@prisma/client/runtime';
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
export declare const getPrismaClientDmmf: (packageLoader: {
    /**
     * A function that must return the Prisma Client Package
     */
    require: () => unknown;
    /**
     * The import specifier being used (the from "..." part)
     */
    importId: string;
    /**
     * The resolved import specifier being used. This can be different than important ID in two ways:
     *
     * 1. NodeJS lookp algorithm
     * 2. Bundlers that rewrite import paths
     */
    importIdResolved: string;
}) => DMMF.Document;
export type PrismaScalarType = 'String' | 'Boolean' | 'Int' | 'BigInt' | 'Float' | 'Decimal' | 'DateTime' | 'Json' | 'Bytes';
//# sourceMappingURL=prisma.d.ts.map