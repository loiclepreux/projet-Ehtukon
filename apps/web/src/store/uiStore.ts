import { create } from 'zustand';

interface UiState {
  isAuthModalOpen: boolean;
  authTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isAuthModalOpen: false,
  authTab: 'login',
  openAuthModal: (tab = 'login') => set({ isAuthModalOpen: true, authTab: tab }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));
