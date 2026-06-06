const TOKEN_STORAGE_KEY = "token";
const AUTH_COOKIE_NAME = "auth_token";
const AUTH_TOKEN_CHANGE_EVENT = "auth-token-change";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getAuthToken() {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
    window.dispatchEvent(new Event(AUTH_TOKEN_CHANGE_EVENT));
}

export function clearAuthToken() {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
    window.dispatchEvent(new Event(AUTH_TOKEN_CHANGE_EVENT));
}

export function hasAuthToken() {
    return Boolean(getAuthToken());
}

export function subscribeAuthTokenChange(onChange: () => void) {
    if (typeof window === "undefined") {
        return () => {};
    }

    const handleStorage = (event: StorageEvent) => {
        if (event.key === TOKEN_STORAGE_KEY) {
            onChange();
        }
    };
    const handleAuthTokenChange = () => onChange();

    window.addEventListener("storage", handleStorage);
    window.addEventListener(AUTH_TOKEN_CHANGE_EVENT, handleAuthTokenChange);

    return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(AUTH_TOKEN_CHANGE_EVENT, handleAuthTokenChange);
    };
}
