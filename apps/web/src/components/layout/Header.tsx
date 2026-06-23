import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useLogout } from '../../hooks/useAuth';

export function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const openAuthModal = useUiStore((s) => s.openAuthModal);
  const logout = useLogout();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#16213e] border-b border-white/10">
      <Link to="/" className="text-2xl font-bold text-white tracking-wider">
        <span className="text-[#e94560]">E</span>htukon
      </Link>

      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link to="/jouer" className="text-white/80 hover:text-white transition-colors">
          Jouer
        </Link>
        <Link to="/scores" className="text-white/80 hover:text-white transition-colors">
          Scores
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-[#e94560] font-semibold">{user?.nom}</span>
            <button
              onClick={() => logout.mutate()}
              className="px-4 py-2 rounded border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors text-sm"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="px-5 py-2 rounded bg-[#e94560] text-white font-semibold hover:bg-[#c73652] transition-colors"
          >
            Connexion
          </button>
        )}
      </nav>
    </header>
  );
}
