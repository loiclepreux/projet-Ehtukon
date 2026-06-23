import { create } from 'zustand';

interface UiState {
  isAuthModalOpen: boolean;
  authTab: 'login' | 'register';
  carouselIndex: number;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setCarouselIndex: (index: number) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isAuthModalOpen: false,
  authTab: 'login',
  carouselIndex: 0,
  openAuthModal: (tab = 'login') => set({ isAuthModalOpen: true, authTab: tab }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setCarouselIndex: (index) => set({ carouselIndex: index }),
}));
