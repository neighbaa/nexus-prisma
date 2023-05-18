"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugNexusPrisma = exports.d = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugName = 'nexus-prisma';
exports.d = (0, debug_1.default)(debugName);
/** Prisma generator system swallows stderr output. */
exports.d.log = console.log.bind(console);
function debugNexusPrisma(...names) {
    const d2 = (0, debug_1.default)([debugName].concat(names).join(':'));
    d2.log = console.log.bind(console);
    return d2;
}
exports.debugNexusPrisma = debugNexusPrisma;
//# sourceMappingURL=debugNexusPrisma.js.map