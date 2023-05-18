"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bytes = void 0;
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const nexus_1 = require("nexus");
/**
 * A Nexus scalar type definition for the `Bytes` scalar type represents byte value as specified by [NodeJS
 * Buffer type](https://nodejs.org/api/buffer.html)
 *
 * Contributes a scalar to your GraphQL schema called `Bytes`.
 *
 * Contributes a `t` `[1]` helper method called `bytes`
 *
 * `[1]` A `t` helper method refers to a method on the argument given to a `definition` method. Helper methods
 * here typically help you quickly create new fields.
 *
 * @example
 *
 *   import { makeSchema, objectType } from 'nexus'
 *   import { Bytes } from 'nexus-prisma/scalars'
 *
 *   SomeObject = objectType({
 *     name: 'SomeObject',
 *     definition(t) {
 *       t.bytes('someBytesField')
 *     },
 *   })
 *
 *   makeSchema({
 *     types: [Bytes, SomeObject],
 *   })
 *
 */
exports.Bytes = (0, nexus_1.asNexusMethod)(new graphql_1.GraphQLScalarType({
    ...graphql_scalars_1.ByteResolver,
    // Override the default 'Byte' name with one that matches what Nexus Prisma expects.
    name: 'Bytes',
}), 'bytes');
//# sourceMappingURL=Bytes.js.map