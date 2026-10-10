import { create } from "zustand";

interface UiState {
    isAuthModalOpen: boolean;
    authTab: "login" | "register";
    isServerWaking: boolean;
    openAuthModal: (tab?: "login" | "register") => void;
    closeAuthModal: () => void;
    setServerWaking: (value: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
    isAuthModalOpen: false,
    authTab: "login",
    isServerWaking: false,
    openAuthModal: (tab = "login") =>
        set({ isAuthModalOpen: true, authTab: tab }),
    closeAuthModal: () => set({ isAuthModalOpen: false }),
    setServerWaking: (value) => set({ isServerWaking: value }),
}));
