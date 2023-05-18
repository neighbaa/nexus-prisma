export * from './whereUniqueInput';
export * from './externalToInternalDMMF';
/**
 * Convert a set of Prisma model field names to a TS ORM property name for the WHERE input.
 *
 * ```ts
 * prismaClient.user.findUnique({ where: { some_compound_fields:  ... } })
 * //                                      ^^^^^^^^^^^^^^^^^^^^
 * ```
 */
export declare const TypeScriptOrmCompoundUniquePropertyName: (fieldNames: string[]) => string;
/**
 * Convert a Prisma model name as it would appear in a PSL file to its version as it would appear in the ORM `prismaClient.<model>.<operation>(...)`.
 */
export declare const typeScriptOrmModelPropertyNameFromModelName: (modelName: string) => string;
/**
 * Use duck typing to determine if the value is an instance of the Prisma Client.
 */
export declare const duckTypeIsPrismaClient: (prisma: unknown, prismaOrmModelPropertyName: string) => prisma is any;
