"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = require("util");
const peerDepValidator_1 = require("../lib/peerDepValidator");
// Want synchronous cached require here
// eslint-disable-next-line
const packageJson = require('../../package.json');
if (!packageJson || !packageJson.version || !packageJson.name) {
    console.warn(`Nexus Prisma failed to import own package.json. It will not be able to validate your peer dependency setup! Saw:\n\n${(0, util_1.inspect)(packageJson)}`);
}
else {
    (0, peerDepValidator_1.enforceValidPeerDependencies)({
        packageJson,
    });
}
tslib_1.__exportStar(require(".nexus-prisma"), exports);
//# sourceMappingURL=main.js.map