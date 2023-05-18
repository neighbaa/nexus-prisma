import kleur from 'kleur';
export const renderList = (items) => {
    return items.map((item) => `→ ${item}`).join('\n');
};
export const renderTitle = (title) => {
    return `${kleur.bold(title.toUpperCase())}:`;
};
export const showWarning = (params) => {
    console.log(renderWarning(params));
};
export function renderError(params) {
    const solution = params.solution ? `\n\n${renderTitle('solution')} ${params.solution}` : '';
    const disable = params.disable ? `\n\n${renderTitle('how to disable')} ${params.disable}` : '';
    // prettier-ignore
    return `${kleur.red(renderTitle('error'))} ${params.title}\n\n${renderTitle('reason')} ${params.reason}\n\n${renderTitle('consequence')} ${params.consequence}${solution}${disable}\n\n${renderTitle('code')} ${params.code}`;
}
export function renderWarning(params) {
    const solution = params.solution ? `\n\n${renderTitle('solution')} ${params.solution}` : '';
    const disable = params.disable ? `\n\n${renderTitle('how to disable')} ${params.disable}` : '';
    // prettier-ignore
    return `${kleur.yellow(renderTitle('warning'))} ${params.title}\n\n${renderTitle('reason')} ${params.reason}\n\n${renderTitle('consequence')} ${params.consequence}${solution}${disable}\n\n${renderTitle('code')} ${params.code}`;
}
export const renderCodeInline = (code) => {
    return `\`${kleur.cyan(code)}\``;
};
export const renderCodeBlock = (code) => {
    return `\`\`\`\n${kleur.cyan(code)}\n\`\`\``;
};
//# sourceMappingURL=Messenger.js.map