import { DMMF } from '@prisma/client/runtime';
export type DocumentableNode = DMMF.Model | DMMF.Field | DMMF.DatamodelEnum;
export declare const isModel: (node: DocumentableNode) => node is DMMF.Model;
export declare const isField: (node: DocumentableNode) => node is DMMF.Field;
export declare const isEnum: (node: DocumentableNode) => node is DMMF.DatamodelEnum;
//# sourceMappingURL=PrismaDmmf.d.ts.map