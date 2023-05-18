"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEnum = exports.isField = exports.isModel = void 0;
const isModel = (node) => {
    return 'fields' in node;
};
exports.isModel = isModel;
const isField = (node) => {
    return 'isList' in node;
};
exports.isField = isField;
const isEnum = (node) => {
    return 'values' in node;
};
exports.isEnum = isEnum;
//# sourceMappingURL=PrismaDmmf.js.map