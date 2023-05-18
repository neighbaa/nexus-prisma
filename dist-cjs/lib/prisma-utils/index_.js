"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duckTypeIsPrismaClient = exports.typeScriptOrmModelPropertyNameFromModelName = exports.TypeScriptOrmCompoundUniquePropertyName = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
tslib_1.__exportStar(require("./whereUniqueInput"), exports);
tslib_1.__exportStar(require("./externalToInternalDMMF"), exports);
/**
 * Convert a set of Prisma model field names to a TS ORM property name for the WHERE input.
 *
 * ```ts
 * prismaClient.user.findUnique({ where: { some_compound_fields:  ... } })
 * //                                      ^^^^^^^^^^^^^^^^^^^^
 * ```
 */
const TypeScriptOrmCompoundUniquePropertyName = (fieldNames) => fieldNames.join('_');
exports.TypeScriptOrmCompoundUniquePropertyName = TypeScriptOrmCompoundUniquePropertyName;
/**
 * Convert a Prisma model name as it would appear in a PSL file to its version as it would appear in the ORM `prismaClient.<model>.<operation>(...)`.
 */
const typeScriptOrmModelPropertyNameFromModelName = (modelName) => (0, lodash_1.lowerFirst)(modelName);
exports.typeScriptOrmModelPropertyNameFromModelName = typeScriptOrmModelPropertyNameFromModelName;
/**
 * Use duck typing to determine if the value is an instance of the Prisma Client.
 */
const duckTypeIsPrismaClient = (prisma, prismaOrmModelPropertyName) => {
    return (prisma !== null &&
        typeof prisma === 'object' &&
        // @ts-expect-error How else can we do this?
        prisma[prismaOrmModelPropertyName] !== null &&
        // @ts-expect-error How else can we do this?
        typeof prisma[prismaOrmModelPropertyName] === 'object' &&
        // @ts-expect-error How else can we do this?
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof prisma[prismaOrmModelPropertyName].findUnique === 'function' &&
        // @ts-expect-error How else can we do this?
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof prisma[prismaOrmModelPropertyName].findMany === 'function');
};
exports.duckTypeIsPrismaClient = duckTypeIsPrismaClient;
//# sourceMappingURL=index_.js.map