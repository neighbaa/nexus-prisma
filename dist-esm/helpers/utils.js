import * as Os from 'os';
import * as Path from 'path';
import { inspect } from 'util';
export function allCasesHandled(x) {
    // Should never happen, but in case it does :)
    // eslint-disable-next-line
    throw new Error(`All cases were not handled:\n${x}`);
}
export function arrayify(x) {
    /* eslint-disable @typescript-eslint/no-unsafe-return */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (Array.isArray(x)) {
        return x;
    }
    return [x];
}
export function dump(x) {
    console.error(inspect(x, { depth: null }));
}
/**
 * On GitHub Actions on Windows the path returned by __dirname is something like:
 *
 *    C:\\Users\\RUNNER~1\\foo\\bar\\qux
 *
 * This function resolvers the `C:\\Users\\RUNNER~1` into the current system user's homedir.
 *
 * https://github.com/prisma/nexus-prisma/pull/104/checks?check_run_id=3175632323#step:9:146
 * https://prisma-company.slack.com/archives/C016KUHB1R6/p1627416092002000
 * https://github.com/actions/virtual-environments/issues/712
 */
export function resolveGitHubActionsWindowsPathTilde(path) {
    return resolveNestedTilde('RUNNER~1', path);
}
/**
 * Sometimes a path tilde, shorthand for homedir, does not show up at the beginning of a path.
 * For example:
 *
 * C:\\\\Users\\\\RUNNER~1\\\\foobar
 *
 * This function will look for the given tilde and if found replace it (and the path preceeding it if any)
 * with the homedir.
 *
 * @example
 *
 *   resolveNestedTilde('RUNNER~1', `C:\\Users\\RUNNER~1\\foo\\bar\\qux`) // --> <whatever homedir is>\\foo\\bar\\qux
 *
 */
export function resolveNestedTilde(tildePattern, path) {
    if (!path.includes(tildePattern))
        return path;
    const pathEnd = path.slice(path.indexOf(tildePattern) + tildePattern.length);
    const pathStart = Os.homedir();
    const newPath = Path.join(pathStart, pathEnd);
    return newPath;
}
export function isModuleNotFoundError(error) {
    // @ts-expect-error .code is not a standard field
    if (error instanceof Error && error.code === 'MODULE_NOT_FOUND') {
        return true;
    }
    return false;
}
//# sourceMappingURL=utils.js.map