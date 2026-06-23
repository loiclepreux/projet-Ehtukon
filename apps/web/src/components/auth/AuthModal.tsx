import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export function AuthModal() {
  const { isAuthModalOpen, authTab, closeAuthModal } = useUiStore();
  const [tab, setTab] = useState<'login' | 'register'>(authTab);

  useEffect(() => {
    if (isAuthModalOpen) setTab(authTab);
  }, [isAuthModalOpen, authTab]);

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-[#16213e] rounded-2xl shadow-2xl border border-white/10 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex mb-6 rounded-lg bg-black/20 p-1">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
              tab === 'login' ? 'bg-[#e94560] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
              tab === 'register' ? 'bg-[#e94560] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Inscription
          </button>
        </div>

        {tab === 'login' ? (
          <LoginForm onSuccess={closeAuthModal} />
        ) : (
          <RegisterForm onSuccess={closeAuthModal} />
        )}
      </div>
    </div>
  );
}
