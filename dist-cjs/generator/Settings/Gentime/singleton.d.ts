import * as Setset from 'setset';
import * as Settings from './settings';
export declare const settings: Setset.Manager<Settings.Input, Setset.InferDataFromInput<Settings.Input>>;
/**
 * Adjust Nexus Prisma's [gentime settings](https://pris.ly/nexus-prisma/docs/settings/gentime).
 *
 * @example
 *
 *   // prisma/nexus-prisma.ts
 *
 *   import { settings } from 'nexus-prisma/generator'
 *
 *   settings({
 *     projectIdIntToGraphQL: 'ID',
 *   })
 *
 * @remarks This is _different_ than Nexus Prisma's [_runtime_
 *          settings](https://pris.ly/nexus-prisma/docs/settings/runtime).
 */
export declare const changeSettings: (input: Setset.UserInput<Settings.Input>) => void;
