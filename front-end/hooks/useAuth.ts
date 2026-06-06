"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { clearAuthToken, hasAuthToken, subscribeAuthTokenChange } from "@/lib/authToken";

export function useAuth() {
    const pathname = usePathname();
    const isAuthenticated = useSyncExternalStore(subscribeAuthTokenChange, hasAuthToken, () => false);
    const isLoading = false;

    useEffect(() => {
        // Если нет токена и юзер на защищённой странице - редирект на login
        if (!isAuthenticated && pathname.startsWith("/dashboard")) {
            // Небольшая задержка чтобы убедиться что компонент загрузился
            const timer = setTimeout(() => {
                window.location.assign(`/auth/login?next=${encodeURIComponent(pathname)}`);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, pathname]);

    const logout = () => {
        clearAuthToken();
        window.location.assign("/auth/login");
    };

    return { isAuthenticated, isLoading, logout };
}
