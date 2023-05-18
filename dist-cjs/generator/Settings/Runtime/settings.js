"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const tslib_1 = require("tslib");
const Setset = tslib_1.__importStar(require("setset"));
const create = () => Setset.create({
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
exports.create = create;
//# sourceMappingURL=settings.js.map