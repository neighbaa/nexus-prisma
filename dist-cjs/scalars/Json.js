"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const nexus_1 = require("nexus");
/**
 * A Nexus scalar type definition for the `JSONObject` scalar type represents JSON objects as specified by
 * [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
 *
 * Contributes a scalar to your GraphQL schema called `Json`.
 *
 * Contributes a `t` `[1]` helper method called `json`
 *
 * `[1]` A `t` helper method refers to a method on the argument given to a `definition` method. Helper methods
 * here typically help you quickly create new fields.
 *
 * @example
 *
 *   import { makeSchema, objectType } from 'nexus'
 *   import { Json } from 'nexus-prisma/scalars'
 *
 *   SomeObject = objectType({
 *     name: 'SomeObject',
 *     definition(t) {
 *       t.json('someJsonField')
 *     },
 *   })
 *
 *   makeSchema({
 *     types: [Json, SomeObject],
 *   })
 *
 */
exports.Json = (0, nexus_1.asNexusMethod)(new graphql_1.GraphQLScalarType({
    ...graphql_scalars_1.JSONResolver,
    // Override the default 'JsonObject' name with one that matches what Nexus Prisma expects.
    name: 'Json',
}), 'json');
//# sourceMappingURL=Json.js.map