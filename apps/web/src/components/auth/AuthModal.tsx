import { useUiStore } from '../../store/uiStore';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export function AuthModal() {
  const { isAuthModalOpen, authTab, closeAuthModal } = useUiStore();

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={closeAuthModal}
    >
      <div
        className="relative w-[90%] max-w-md rounded-2xl p-8"
        style={{ background: '#111', boxShadow: '0 0 30px #95acc4', color: '#fff' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute top-3 right-5 text-3xl cursor-pointer"
          style={{ color: '#ff0000' }}
          onClick={closeAuthModal}
        >
          &times;
        </span>

        <div
          className="rounded-2xl p-6 flex flex-col"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #95acc4', boxShadow: 'inset 0 0 10px #95acc4' }}
        >
          <h2 className="text-2xl font-bold text-center mb-5" style={{ color: '#95acc4' }}>
            {authTab === 'login' ? 'Connexion' : 'Créer un compte'}
          </h2>
          {authTab === 'login' ? (
            <LoginForm onSuccess={closeAuthModal} />
          ) : (
            <RegisterForm onSuccess={closeAuthModal} />
          )}
        </div>
      </div>
    </div>
  );
}
