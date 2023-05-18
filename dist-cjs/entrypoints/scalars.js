"use strict";
/**
 * Predefined Nexus scalar type definitions to satisfy all custom scalars needed in GraphQL to map to the
 * native scalars in Prisma. The mapping is as follows:
 *
 * | Prisma     | GraphQL    | Nexus `t` Helper | GraphQL Scalar Implementation                                         | Additional Info                                                                                              |
 * | ---------- | ---------- | ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
 * | `Json`     | `Json`     | `json`           | [JsonObject](https://www.graphql-scalars.dev/docs/scalars/jsonobject) |                                                                                                              |
 * | `DateTime` | `DateTime` | `dateTime`       | [DateTime](https://www.graphql-scalars.dev/docs/scalars/datetime)     |                                                                                                              |
 * | `BigInt`   | `BigInt`   | `bigInt`         | [BigInt](https://www.graphql-scalars.dev/docs/scalars/big-int)        | [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |
 * | `Bytes`    | `Bytes`    | `bytes`          | [Byte](https://www.graphql-scalars.dev/docs/scalars/byte/)            | [Node.js Buffer](https://nodejs.org/api/buffer.html#buffer_buffer)                                           |
 * | `Decimal` | `Decimal` | `decimal` | (internal) | Uses [Decimal.js](https://github.com/MikeMcl/decimal.js)
 * |.
 *
 * @example
 *
 *   // Use this default export
 *
 *   import { makeSchema, objectType } from 'nexus'
 *   import NexusPrismaScalars from 'nexus-prisma/scalars'
 *
 *   makeSchema({
 *     types: [NexusPrismaScalars],
 *   })
 *
 * @example
 *
 *   // Use ESM namespace import if you prefer
 *
 *   import { makeSchema, objectType } from 'nexus'
 *   import * as NexusPrismaScalars from 'nexus-prisma/scalars'
 *
 *   makeSchema({
 *     types: [NexusPrismaScalars],
 *   })
 *
 * @example
 *
 *   // Use only select predefined custom scalars
 *
 *   import { makeSchema, objectType } from 'nexus'
 *   import { Json } from 'nexus-prisma/scalars'
 *
 *   makeSchema({
 *     types: [Json],
 *   })
 *
 * @example
 *
 *   // Use your own custom scalars instead of these.
 *
 *   import { GraphQLScalarType } from 'graphql'
 *   import { JSONObjectResolver, DateTimeResolver } from 'graphql-scalars'
 *   import { asNexusMethod, makeSchema } from 'nexus'
 *
 *   const jsonScalar = new GraphQLScalarType({
 *     ...JSONObjectResolver,
 *     // Override the default 'JsonObject' name with one that matches what Nexus Prisma expects.
 *     name: 'Json',
 *   })
 *
 *   const dateTimeScalar = new GraphQLScalarType(DateTimeResolver)
 *
 *   makeSchema({
 *     types: [asNexusMethod(jsonScalar, 'json'), asNexusMethod(dateTimeScalar, 'dateTime')],
 *   })
 *
 * @remarks Some Of the Prisma scalars do not have a natural standard representation in GraphQL. For
 *          these cases Nexus Prisma generates code that references type names matching those scalar
 *          names in Prisma. Then, you are expected to define those custom scalar types in your GraphQL
 *          API. For convenience you can use these ones.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = exports.Decimal = exports.DateTime = exports.Bytes = exports.BigInt = void 0;
const BigInt_1 = require("../scalars/BigInt");
Object.defineProperty(exports, "BigInt", { enumerable: true, get: function () { return BigInt_1.BigInt; } });
const Bytes_1 = require("../scalars/Bytes");
Object.defineProperty(exports, "Bytes", { enumerable: true, get: function () { return Bytes_1.Bytes; } });
const DateTime_1 = require("../scalars/DateTime");
Object.defineProperty(exports, "DateTime", { enumerable: true, get: function () { return DateTime_1.DateTime; } });
const Decimal_1 = require("../scalars/Decimal");
Object.defineProperty(exports, "Decimal", { enumerable: true, get: function () { return Decimal_1.Decimal; } });
const Json_1 = require("../scalars/Json");
Object.defineProperty(exports, "Json", { enumerable: true, get: function () { return Json_1.Json; } });
//# sourceMappingURL=scalars.js.map