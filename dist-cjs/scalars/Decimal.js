"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decimal = void 0;
const tslib_1 = require("tslib");
const nexus_1 = require("nexus");
const DecimalJs = tslib_1.__importStar(require("decimal.js"));
const graphql_1 = require("graphql");
/**
 * Copied from prisma-graphql-type-decimal.
 *
 * @see https://github.com/unlight/prisma-graphql-type-decimal/blob/master/src/index.ts
 */
const decimalConfig = {
    name: 'Decimal',
    description: 'An arbitrary-precision Decimal type',
    /**
     * Value sent to the client
     */
    serialize(value) {
        // console.log('serialize value', value.constructor.name)
        return String(value);
    },
    /**
     * Value from the client
     */
    parseValue(value) {
        return new DecimalJs.Decimal(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT || ast.kind === graphql_1.Kind.FLOAT || ast.kind === graphql_1.Kind.STRING) {
            return new DecimalJs.Decimal(ast.value);
        }
        return null;
    },
};
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
exports.Decimal = (0, nexus_1.asNexusMethod)(new graphql_1.GraphQLScalarType(decimalConfig), 'decimal');
//# sourceMappingURL=Decimal.js.map