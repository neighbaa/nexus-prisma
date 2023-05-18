import * as Setset from 'setset';
export const create = () => Setset.create({
    fields: {
        prismaClientContextField: {
            initial: () => 'prisma',
        },
        checks: {
            fields: {
                PrismaClientOnContext: {
                    shorthand: (enabled) => ({ enabled }),
                    fields: {
                        enabled: {
                            initial: () => true,
                        },
                        strategy: {
                            initial: () => 'instanceOf_duckType_fallback',
                        },
                    },
                },
            },
        },
    },
});
//# sourceMappingURL=settings.js.map