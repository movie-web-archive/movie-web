import { satisfies } from "semver";

const allowedExtensionRange = "~1.0";

export function isAllowedExtensionVersion(version: string): boolean {
  return satisfies(version, allowedExtensionRange);
}
