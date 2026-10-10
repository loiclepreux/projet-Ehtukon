import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import type { AuthResponse, User } from "@ehtukon/shared";
import { useEffect } from "react";

export function useLogin() {
    const setAuth = useAuthStore((s) => s.setAuth);
    return useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            api.post<AuthResponse>("/auth/login", data).then((r) => r.data),
        onSuccess: (data) => setAuth(data.user, data.accessToken),
    });
}

export function useRegister() {
    const setAuth = useAuthStore((s) => s.setAuth);
    return useMutation({
        mutationFn: (data: { nom: string; email: string; password: string }) =>
            api.post<AuthResponse>("/auth/register", data).then((r) => r.data),
        onSuccess: (data) => setAuth(data.user, data.accessToken),
    });
}

export function useLogout() {
    const clearAuth = useAuthStore((s) => s.clearAuth);
    return useMutation({
        mutationFn: () => api.post("/auth/logout"),
        onSuccess: clearAuth,
    });
}

export function useAuthInit() {
    const setUser = useAuthStore((s) => s.setUser);
    const clearAuth = useAuthStore((s) => s.clearAuth);

    useEffect(() => {
        api.get<User>("/auth/me")
            .then((r) => setUser(r.data))
            .catch(() => clearAuth());
    }, [setUser, clearAuth]);
}
