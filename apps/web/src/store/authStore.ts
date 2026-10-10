import { create } from "zustand";
import type { User } from "@ehtukon/shared";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    setAuth: (user: User, accessToken: string) => void;
    setUser: (user: User) => void;
    setAccessToken: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    setAuth: (user, accessToken) =>
        set({
            user,
            accessToken,
            isAuthenticated: true,
            isCheckingAuth: false,
        }),
    setUser: (user) =>
        set({ user, isAuthenticated: true, isCheckingAuth: false }),
    setAccessToken: (token) => set({ accessToken: token }),
    clearAuth: () =>
        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isCheckingAuth: false,
        }),
}));
