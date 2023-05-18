import { DMMF } from '@prisma/client/runtime';
import { Module } from './helpers/types';
import { Settings } from './Settings';
export declare const OUTPUT_SOURCE_DIR: string;
/** Generate the Nexus Prisma runtime files and emit them into a "hole" in the internal package source tree. */
export declare const generateRuntimeAndEmit: (dmmf: DMMF.Document, settings: Settings.Gentime.Manager) => void;
/** Transform the given DMMF into JS source code with accompanying TS declarations. */
export declare const generateRuntime: (dmmf: DMMF.Document, settings: Settings.Gentime.Manager) => Module[];
//# sourceMappingURL=generate.d.ts.map