"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
// Remove this dep once we stop supporting Node 14.x
require("ts-replace-all");
const format = (rawComment) => {
    const formattedComment = rawComment.replaceAll(/\n/g, ' ').replaceAll(/ +/g, ' ').trim();
    return formattedComment;
};
exports.format = format;
//# sourceMappingURL=PrismaDocumentation.js.map