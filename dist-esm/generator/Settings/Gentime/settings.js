import * as Setset from 'setset';
export const create = () => Setset.create({
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
//# sourceMappingURL=settings.js.map