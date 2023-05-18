"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWhereUniqueInput = void 0;
const lodash_1 = require("lodash");
const util_1 = require("util");
const index_1 = require("./index_");
const createWhereUniqueInput = (source, model) => {
    // TODO There is no reason to compute this every time. Memoize or move.
    const uniqueIdentifierFields = getUniqueIdentifierFields(model);
    const uniqueIdentifierFieldsMissingInData = uniqueIdentifierFields.filter((_) => !source[_]);
    if (uniqueIdentifierFieldsMissingInData.length > 0) {
        // TODO rich errors
        throw new Error(`Cannot create Prisma Client where unique input because the source data (${(0, util_1.inspect)(source)}) is missing the following unique identifier fields: ${uniqueIdentifierFieldsMissingInData.join(', ')}`);
    }
    if (uniqueIdentifierFields.length === 1) {
        return (0, lodash_1.pick)(source, uniqueIdentifierFields);
    }
    return {
        [(0, index_1.TypeScriptOrmCompoundUniquePropertyName)(uniqueIdentifierFields)]: (0, lodash_1.pick)(source, uniqueIdentifierFields),
    };
};
exports.createWhereUniqueInput = createWhereUniqueInput;
/**
 * Get the field name (or names) of a model that are used to uniquely identify its records.
 *
 * If the model has no unique fields than error is thrown. This should be impossible as Prisma requires models
 * to have unique record identity setup.
 *
 * @remarks We support the following unique-record-identity patterns. The first one we find is used.
 *
 *          1. Exactly one field with an `@id` annotation.
 *          2. Multiple fields targeted by an `@@id` clause.
 *          3. Exactly one field with an `@unique` annotation (if multiple, use first).
 *          4. Multiple fields targeted by an `@@unique` clause.
 */
function getUniqueIdentifierFields(model) {
    // Try finding 1
    const singleIdField = model.fields.find((f) => f.isId);
    if (singleIdField) {
        return [singleIdField.name];
    }
    // Try finding 2
    if (model.primaryKey && model.primaryKey.fields.length > 0) {
        return model.primaryKey.fields;
    }
    // Try finding 3
    const singleUniqueField = model.fields.find((f) => f.isUnique);
    if (singleUniqueField) {
        return [singleUniqueField.name];
    }
    // Try finding 4
    if (model.uniqueFields && model.uniqueFields.length > 0) {
        return model.uniqueFields[0]; // I don't know why typescript want a cast here
    }
    throw new Error(`Unable to resolve a unique identifier for the Prisma model: ${model.name}`);
}
//# sourceMappingURL=whereUniqueInput.js.map