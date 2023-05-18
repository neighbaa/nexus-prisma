"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const tslib_1 = require("tslib");
const Setset = tslib_1.__importStar(require("setset"));
const create = () => Setset.create({
    fields: {
        output: {
            shorthand: (directory) => ({ directory }),
            initial: () => ({
                directory: 'default',
                name: 'index',
            }),
            fields: {
                directory: {},
                name: {
                    initial: () => 'index',
                },
            },
        },
        projectIdIntToGraphQL: {
            initial: () => 'Int',
        },
        jsdocPropagationDefault: {
            initial: () => 'guide',
        },
        docPropagation: {
            shorthand: (enabled) => ({
                GraphQLDocs: enabled,
                JSDoc: enabled,
            }),
            fields: {
                GraphQLDocs: {
                    initial: () => true,
                },
                JSDoc: {
                    initial: () => true,
                },
            },
        },
        prismaClientImportId: {
            initial: () => `@prisma/client`,
        },
    },
});
exports.create = create;
//# sourceMappingURL=settings.js.map