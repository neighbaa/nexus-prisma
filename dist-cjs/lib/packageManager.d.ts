export type PackageManagerType = 'yarn' | 'npm';
/**
 * Detect if the project is yarn or npm based. Detection is based on useragent, if present, then the lockfile
 * present. If nothing is found, npm is assumed.
 */
export declare function detectProjectPackageManager(opts?: {
    /**
     * The project directory path to look for package manager files if userAgent approach does not work.
     *
     * Defaults to current working directory.
     */
    projectRoot?: string;
}): PackageManagerType;
/** Render the running of the given command as coming from the local bin. */
export declare function renderRunBin(pmt: PackageManagerType, commandString: string): string;
/** Render running of the given script defined in package.json. */
export declare function renderRunScript(pmt: PackageManagerType, scriptName: string): string;
/** Add a package to the project. */
export declare function renderAddDeps(pmt: PackageManagerType, packages: string[], options?: {
    dev?: boolean;
}): string;
