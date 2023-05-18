import { DMMF } from '@prisma/client/runtime';
import type { Settings } from '../Settings';
type JSDoc = string;
type FieldModelParams = {
    field: DMMF.Field;
    model: DMMF.Model;
    settings: Settings.Gentime.Manager;
};
/**
 * Enum
 */
export declare const jsDocForEnum: (params: {
    enum: DMMF.DatamodelEnum;
    settings: Settings.Gentime.Manager;
}) => JSDoc;
/**
 * Model
 */
export declare const jsDocForModel: (params: {
    model: DMMF.Model;
    settings: Settings.Gentime.Manager;
}) => JSDoc;
/**
 * Field
 */
export declare const jsDocForField: (params: FieldModelParams) => JSDoc;
export {};
