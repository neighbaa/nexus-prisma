import { PackageJson } from 'type-fest';
export declare const envarSpecs: {
    NO_PEER_DEPENDENCY_CHECK: {
        name: string;
        values: string[];
    };
    PEER_DEPENDENCY_CHECK: {
        name: string;
        values: string[];
    };
};
type Failure = {
    message: string;
    kind: 'peer_dep_not_installed';
} | {
    message: string;
    kind: 'peer_dep_invalid_version';
} | {
    message: string;
    kind: 'peer_dep_package_json_invalid';
} | {
    message: string;
    kind: 'peer_dep_package_json_read_error';
    error: unknown;
} | {
    message: string;
    kind: 'unexpected_error';
    error: unknown;
};
export declare function enforceValidPeerDependencies({ packageJson }: {
    packageJson: PackageJson;
}): void;
/**
 * Check that the given package's peer dependency requirements are met.
 *
 * When envar skipping enabled then:
 *
 * 1. NO-op if PEER_DEPENDENCY_CHECK envar is set to false or 0
 * 2. NO-op if NO_PEER_DEPENDENCY_CHECK envar is set to true or 1
 */
export declare function validatePeerDependencies({ packageJson }: {
    packageJson: PackageJson;
}): null | Failure;
export declare function validatePeerDependencyRangeSatisfied({ peerDependencyName, requireer, }: {
    peerDependencyName: string;
    requireer: PackageJson;
}): null | Failure;
export {};
//# sourceMappingURL=peerDepValidator.d.ts.map