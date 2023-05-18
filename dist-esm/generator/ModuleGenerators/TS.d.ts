import { LiteralUnion } from 'type-fest';
import { DMMF } from '@prisma/generator-helper';
import { StandardGraphQLScalarType } from '../../helpers/graphql';
import { Module } from '../helpers/types';
import type { Settings } from '../Settings';
export declare const createModule: (dmmf: DMMF.Document, settings: Settings.Gentime.Manager) => Module;
export declare const renderTypeScriptDeclarationForDocumentModels: (dmmf: DMMF.Document, settings: Settings.Gentime.Manager) => string;
/**
 * Map the fields type to a GraphQL type.
 *
 * @remarks The `settings` param type uses settings data instead of Setset instance because this helper
 *          is used at runtime too where we don't have a Setset instance for gentime.
 */
export declare const fieldTypeToGraphQLType: (field: DMMF.Field, settings: Settings.Gentime.Data) => LiteralUnion<StandardGraphQLScalarType, string>;
//# sourceMappingURL=TS.d.ts.map