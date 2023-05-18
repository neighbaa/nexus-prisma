import * as Nexus from 'nexus';
import { NexusEnumTypeConfig, NexusListDef, NexusNonNullDef, NexusNullDef } from 'nexus/dist/core';
import type { DMMF } from '@prisma/client/runtime';
import { Resolver } from '../../helpers/utils';
import { Module } from '../helpers/types';
import { Settings } from '../Settings';
type PrismaModelOrEnumName = string;
type PrismaFieldName = string;
type PrismaModelFieldNameOrMetadataFieldName = string;
type NexusTypeDefConfigurations = Record<PrismaModelOrEnumName, NexusObjectTypeDefConfiguration | NexusEnumTypeDefConfiguration>;
export type Settings = {
    runtime: Settings.Runtime.Manager;
    gentime: Settings.Gentime.Data;
};
/**
 * Create the module specification for the JavaScript runtime.
 */
export declare const createModule: (params: {
    /**
     * Resolved generator settings (whatever user supplied merged with defaults).
     */
    gentimeSettings: Settings.Gentime.Manager;
    /**
     * Should the module be generated using ESM instead of CJS?
     */
    esm: boolean;
    /**
     * Detailed data about the Prisma Schema contents and available operations over its models.
     */
    dmmf: DMMF.Document;
}) => Module;
export declare const createNexusTypeDefConfigurations: (dmmf: DMMF.Document, settings: Settings) => NexusTypeDefConfigurations;
type NexusObjectTypeDefConfiguration = Record<PrismaModelFieldNameOrMetadataFieldName, {
    name: PrismaFieldName;
    type: NexusNonNullDef<string> | NexusListDef<string> | NexusNullDef<string>;
    description: string;
} | string | undefined>;
export declare const prismaFieldToNexusType: (field: DMMF.Field, settings: Settings) => Nexus.core.NexusNonNullDef<any> | Nexus.core.NexusNullDef<any>;
/**
 * Create a GraphQL resolver for the given Prisma field. If the Prisma field is a scalar then no resolver is
 * returned and instead the Nexus default is relied upon.
 *
 * @remarks Allow Nexus default resolver to handle resolving scalars.
 *
 *          By using Nexus default we also affect its generated types, assuming there are not explicit
 *          source types setup which actually for Nexus Prisma projects there usually will be (the Prisma
 *          model types). Still, using the Nexus default is a bit more idiomatic and provides the better
 *          _default_ type generation experience of scalars being expected to come down from the source
 *          type (aka. parent).
 *
 *          So:
 *
 *          ```ts ...
 *          t.field(M1.Foo.bar)
 *          ```
 *
 *          where `bar` is a scalar prisma field would have NO resolve generated and thus default Nexus
 *          as mentioned would think that `bar` field WILL be present on the source type. This is, again,
 *          mostly moot since most Nexus Prisma users WILL setup the Prisma source types e.g.:
 *
 *          ```ts ...
 *          sourceTypes: { modules: [{ module: '.prisma/client', alias: 'PrismaClient' }]},
 *          ```
 *
 *          but this is overall the better way to handle this detail it seems.
 */
export declare const nexusResolverFromPrismaField: (model: DMMF.Model, field: DMMF.Field, settings: Settings) => undefined | Resolver;
type AnyNexusEnumTypeConfig = NexusEnumTypeConfig<string>;
type NexusEnumTypeDefConfiguration = AnyNexusEnumTypeConfig;
export {};
