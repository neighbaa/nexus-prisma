"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCodeBlock = exports.renderCodeInline = exports.renderWarning = exports.renderError = exports.renderTitle = exports.renderList = void 0;
const tslib_1 = require("tslib");
const kleur_1 = tslib_1.__importDefault(require("kleur"));
const renderList = (items) => {
    return items.map((item) => `→ ${item}`).join('\n');
};
exports.renderList = renderList;
const renderTitle = (title) => {
    return `${kleur_1.default.bold(title.toUpperCase())}:`;
};
exports.renderTitle = renderTitle;
function renderError(params) {
    const solution = params.solution ? `\n\n${(0, exports.renderTitle)('solution')} ${params.solution}` : '';
    const disable = params.disable ? `\n\n${(0, exports.renderTitle)('how to disable')} ${params.disable}` : '';
    // prettier-ignore
    return `${kleur_1.default.red((0, exports.renderTitle)('error'))} ${params.title}\n\n${(0, exports.renderTitle)('reason')} ${params.reason}\n\n${(0, exports.renderTitle)('consequence')} ${params.consequence}${solution}${disable}\n\n${(0, exports.renderTitle)('code')} ${params.code}`;
}
exports.renderError = renderError;
function renderWarning(params) {
    const solution = params.solution ? `\n\n${(0, exports.renderTitle)('solution')} ${params.solution}` : '';
    const disable = params.disable ? `\n\n${(0, exports.renderTitle)('how to disable')} ${params.disable}` : '';
    // prettier-ignore
    return `${kleur_1.default.yellow((0, exports.renderTitle)('warning'))} ${params.title}\n\n${(0, exports.renderTitle)('reason')} ${params.reason}\n\n${(0, exports.renderTitle)('consequence')} ${params.consequence}${solution}${disable}\n\n${(0, exports.renderTitle)('code')} ${params.code}`;
}
exports.renderWarning = renderWarning;
const renderCodeInline = (code) => {
    return `\`${kleur_1.default.cyan(code)}\``;
};
exports.renderCodeInline = renderCodeInline;
const renderCodeBlock = (code) => {
    return `\`\`\`\n${kleur_1.default.cyan(code)}\n\`\`\``;
};
exports.renderCodeBlock = renderCodeBlock;
//# sourceMappingURL=diagnostic.js.map