/**
 * Next's basePath (set only for the GitHub Pages export build) is applied
 * automatically to next/link and next/image, but not to raw string hrefs
 * pointing at files in /public. Use this for those.
 */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
