"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSettings = exports.settings = void 0;
const tslib_1 = require("tslib");
const Settings = tslib_1.__importStar(require("./settings"));
exports.settings = Settings.create();
const changeSettings = (input) => {
    exports.settings.change(input);
};
exports.changeSettings = changeSettings;
//# sourceMappingURL=singleton.js.map