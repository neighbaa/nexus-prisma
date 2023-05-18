"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSettings = exports.settings = void 0;
const tslib_1 = require("tslib");
const Settings = tslib_1.__importStar(require("./settings"));
exports.settings = Settings.create();
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
const changeSettings = (input) => {
    exports.settings.change(input);
};
exports.changeSettings = changeSettings;
//# sourceMappingURL=singleton.js.map