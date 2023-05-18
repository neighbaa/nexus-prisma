/**
 * A Nexus scalar type definition for arbitrary-precision Decimal type.
 *
 * Contributes a scalar to your GraphQL schema called `Decimal`.
 *
 * Contributes a `t` `[1]` helper method called `decimal`
 *
 * `[1]` A `t` helper method refers to a method on the argument given to a `definition` method. Helper methods
 * here typically help you quickly create new fields.
 *
 * @example
 *
 *   import { makeSchema, objectType } from 'nexus'
 *   import { Decimal } from 'nexus-prisma/scalars'
 *
 *   SomeObject = objectType({
 *     name: 'SomeObject',
 *     definition(t) {
 *       t.decimal('someDecimalField')
 *     },
 *   })
 *
 *   makeSchema({
 *     types: [Decimal, SomeObject],
 *   })
 *
 */
export declare const Decimal: import("nexus/dist/core").AllNexusOutputTypeDefs;
