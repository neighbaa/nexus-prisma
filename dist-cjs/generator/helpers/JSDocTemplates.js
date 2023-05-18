"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsDocForField = exports.jsDocForModel = exports.jsDocForEnum = void 0;
const tslib_1 = require("tslib");
const dindist_1 = tslib_1.__importDefault(require("dindist"));
const prisma_documentation_1 = require("../../lib/prisma-documentation");
const jsdocIndent = '  ';
const jsdocEmptyLine = `\n${jsdocIndent}*\n`;
/**
 * Enum
 */
const jsDocForEnum = (params) => {
    const sections = [
        enumIntro(params.enum),
        nodeDocumentation({
            enum: params.enum,
            settings: params.settings,
        }),
        `* Contains these members: ${params.enum.values.map((value) => value.name).join(', ')}`,
        enumExample(params.enum),
    ];
    const jsdoc = jsDocBookends(joinSections(sections));
    return jsdoc;
};
exports.jsDocForEnum = jsDocForEnum;
const enumIntro = (enum_) => {
    return (0, dindist_1.default) `
    * Generated Nexus \`enumType\` configuration based on your Prisma schema's enum \`${enum_.name}\`.
  `;
};
const enumExample = (enum_) => {
    return (0, dindist_1.default) `
    * @example
    *
    * import { enumType } from 'nexus'
    * import { ${enum_.name} } from 'nexus-prisma'
    *
    * enumType(${enum_.name})
  `;
};
const enumMissingDocGuide = (enum_) => {
    return (0, dindist_1.default) `
    ${missingDocsIntro({ kind: 'enum', enum: enum_ })}
    *
    * \`\`\`prisma
    * /// Lorem ipsum dolor sit amet...
    * enum ${enum_.name} {
    ${enum_.values.map((value) => `*   ${value.name}`).join('\n')}
    * }
    * \`\`\`
    * 
    ${missingDocsOutro}
  `;
};
/**
 * Model
 */
const jsDocForModel = (params) => {
    const sections = [modelIntro(params.model), nodeDocumentation(params), modelExample(params.model)];
    const jsdoc = jsDocBookends(joinSections(sections));
    return jsdoc;
};
exports.jsDocForModel = jsDocForModel;
const modelIntro = (model) => {
    return (0, dindist_1.default) `
    * Generated Nexus \`objectType\` configuration based on your Prisma schema's model \`${model.name}\`.
  `;
};
const nodeDocumentation = (params) => {
    const documentation = 'field' in params
        ? params.field.documentation
        : 'model' in params
            ? params.model.documentation
            : 'enum' in params
                ? params.enum.documentation
                : null;
    if (documentation) {
        return (0, dindist_1.default) `
      * ${prisma_documentation_1.PrismaDocumentation.format(documentation)}
    `;
    }
    if (params.settings.data.jsdocPropagationDefault === 'guide') {
        return 'field' in params
            ? fieldMissingDocGuide({
                field: params.field,
                model: params.model,
                settings: params.settings,
            })
            : 'model' in params
                ? modelMissingDocGuide(params.model)
                : enumMissingDocGuide(params.enum);
    }
    return null;
};
const modelMissingDocGuide = (model) => {
    // TODO once https://stackoverflow.com/questions/61893953/how-to-escape-symbol-in-jsdoc-for-vscode
    // is resolved then we can write better examples below like: id String @id
    return (0, dindist_1.default) `
    ${missingDocsIntro({ kind: 'model', model })}
    * 
    * \`\`\`prisma
    * /// Lorem ipsum dolor sit amet...
    * model ${model.name} {
    *   foo  String
    * }
    * \`\`\`
    * 
    ${missingDocsOutro}
  `;
};
const modelExample = (model) => {
    return (0, dindist_1.default) `
    * @example
    *
    * import { objectType } from 'nexus'
    * import { ${model.name} } from 'nexus-prisma'
    *
    * objectType({
    *   name: ${model.name}.$name
    *   description: ${model.name}.$description
    *   definition(t) {
    *     t.field(${model.name}.id)
    *   }
    * })
  `;
};
/**
 * Field
 */
const jsDocForField = (params) => {
    const sections = [fieldIntro(params), nodeDocumentation(params), fieldExample(params)];
    const jsdoc = jsDocBookends(joinSections(sections));
    return jsdoc;
};
exports.jsDocForField = jsDocForField;
const fieldIntro = ({ model, field }) => {
    return (0, dindist_1.default) `
    * Generated Nexus \`t.field\` configuration based on your Prisma schema's model-field \`${model.name}.${field.name}\`.
  `;
};
const fieldMissingDocGuide = ({ model, field }) => {
    return (0, dindist_1.default) `
    ${missingDocsIntro({ kind: 'model', model })}
    * \`\`\`prisma
    * model ${model.name} {
    *   /// Lorem ipsum dolor sit amet.
    *   ${field.name}  ${field.type}${field.isRequired ? '' : '?'}
    * }
    * \`\`\`
    *
    ${missingDocsOutro}
  `;
};
const fieldExample = ({ model, field }) => {
    return (0, dindist_1.default) `
    * @example
    *
    * import { objectType } from 'nexus'
    * import { ${model.name} } from 'nexus-prisma'
    *
    * objectType({
    *   name: ${model.name}.$name
    *   description: ${model.name}.$description
    *   definition(t) {
    *     t.field(${model.name}.${field.name})
    *   }
    * })
  `;
};
/**
 * Helpers
 */
const missingDocsIntro = (info) => {
    const thisItem = info.kind === 'enum'
        ? `enum ${info.enum.name}`
        : info.kind === 'model'
            ? `model ${info.model.name}`
            : info.kind;
    return (0, dindist_1.default) `
     * ### ️⚠️ You have not written documentation for ${thisItem}
     *
     * Replace this default advisory JSDoc with your own documentation about ${thisItem}
     * by documenting it in your Prisma schema. For example:
  `;
};
const missingDocsOutro = `* Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).`;
/**
 * Convert a list of JSDoc sections into a single unified JSDoc section.
 *
 * Each joined section is separated by an empty line.
 *
 * Each section being joined is expected to handle its own JSDoc "spine" (e.g. `* some content here`).
 */
const joinSections = (sections) => {
    return sections.filter((section) => section !== null).join(jsdocEmptyLine + jsdocIndent);
};
const jsDocBookends = (content) => {
    const start = `/**`;
    const end = '*/';
    const body = prefixBlock(jsdocIndent, content);
    return `${start}\n${body}\n${jsdocIndent}${end}`;
};
const prefixBlock = (prefix, content) => {
    return content
        .split('\n')
        .map((_) => `${prefix}${_.trim()}`)
        .join('\n');
};
//# sourceMappingURL=JSDocTemplates.js.map