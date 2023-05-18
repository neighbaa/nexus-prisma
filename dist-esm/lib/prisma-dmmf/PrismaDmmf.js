export const isModel = (node) => {
    return 'fields' in node;
};
export const isField = (node) => {
    return 'isList' in node;
};
export const isEnum = (node) => {
    return 'values' in node;
};
//# sourceMappingURL=PrismaDmmf.js.map