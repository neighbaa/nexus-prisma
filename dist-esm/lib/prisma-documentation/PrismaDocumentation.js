// Remove this dep once we stop supporting Node 14.x
import 'ts-replace-all';
export const format = (rawComment) => {
    const formattedComment = rawComment.replaceAll(/\n/g, ' ').replaceAll(/ +/g, ' ').trim();
    return formattedComment;
};
//# sourceMappingURL=PrismaDocumentation.js.map