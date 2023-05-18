export type Resolver = (root: RecordUnknown, args: RecordUnknown, ctx: RecordUnknown) => MaybePromise<unknown>;
export type MaybePromise<T> = T | Promise<T>;
export type RecordUnknown<T = unknown> = Record<string, T>;
export declare function allCasesHandled(x: never): never;
export declare function arrayify<T>(x: T): T extends unknown[] ? T : T[];
export declare function dump(x: unknown): void;
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
export declare function resolveGitHubActionsWindowsPathTilde(path: string): string;
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
export declare function resolveNestedTilde(tildePattern: string, path: string): string;
export declare function isModuleNotFoundError(error: unknown): error is Error;
//# sourceMappingURL=utils.d.ts.map