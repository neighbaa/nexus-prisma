"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigInt = void 0;
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const nexus_1 = require("nexus");
/**
 * A Nexus scalar type definition for the `BigInt` scalar type
 *
 * Contributes a scalar to your GraphQL schema called `BigInt`.
 *
 * Contributes a `t` `[1]` helper method called `bigInt`
 *
 * `[1]` A `t` helper method refers to a method on the argument given to a `definition` method. Helper methods
 * here typically help you quickly create new fields.
 *
 * @example
 *
 *   import { makeSchema, objectType } from 'nexus'
 *   import { BigInt } from 'nexus-prisma/scalars'
 *
 *   SomeObject = objectType({
 *     name: 'SomeObject',
 *     definition(t) {
 *       t.bigInt('someBigIntField')
 *     },
 *   })
 *
 *   makeSchema({
 *     types: [BigInt, SomeObject],
 *   })
 *
 */
exports.BigInt = (0, nexus_1.asNexusMethod)(new graphql_1.GraphQLScalarType({
    ...graphql_scalars_1.BigIntResolver,
    description: `The \`BigInt\` scalar type represents non-fractional signed whole numeric values.
@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt`,
}), 'bigInt');
//# sourceMappingURL=BigInt.js.map