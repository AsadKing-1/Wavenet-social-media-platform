/**
 * Safely validates a redirect URL to prevent Open Redirect vulnerabilities.
 * @param urlStr The candidate URL to redirect to.
 * @param fallback The fallback URL if the candidate is unsafe or invalid.
 */
export function getSafeRedirect(urlStr: string | null | undefined, fallback: string = "/dashboard"): string {
    if (!urlStr) return fallback;

    // Remove control characters and whitespace
    const cleanUrl = urlStr.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

    // Must start with exactly one '/' and not contain backslashes
    const isRelative = cleanUrl === "/" || /^\/[^\/\\]/.test(cleanUrl);
    if (!isRelative) {
        return fallback;
    }

    try {
        // Use a dummy origin to parse the URL and ensure it doesn't resolve to a different origin
        const dummyBase = "https://safe.internal.app";
        const parsed = new URL(cleanUrl, dummyBase);

        // If the origin is not the dummy base, then it's an absolute URL pointing elsewhere
        if (parsed.origin !== dummyBase) {
            return fallback;
        }

        // Return only the path, search query, and hash parameters
        const safePath = parsed.pathname + parsed.search + parsed.hash;
        if (safePath === "/" || /^\/[^\/\\]/.test(safePath)) {
            return safePath;
        }
    } catch (e) {
        // Fallback if URL parsing fails
    }

    return fallback;
}
