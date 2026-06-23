import { Link } from 'react-router-dom';
import { useUiStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

export function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const openAuthModal = useUiStore((s) => s.openAuthModal);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <h1 className="text-6xl font-extrabold text-white mb-4 tracking-tight">
        <span className="text-[#e94560]">Ehtukon</span>
      </h1>
      <p className="text-xl text-white/60 max-w-2xl mb-4">
        La plateforme de quiz qui te fait progresser en programmation.
      </p>
      <p className="text-white/40 max-w-xl mb-10 leading-relaxed">
        HTML · CSS · JavaScript · PHP · SQL — 3 niveaux de difficulté, des centaines de questions,
        un classement mondial. Apprends en t'amusant.
      </p>

      <div className="flex gap-4">
        <Link
          to="/jouer"
          className="px-8 py-4 rounded-xl bg-[#e94560] text-white font-bold text-lg hover:bg-[#c73652] transition-colors shadow-lg shadow-[#e94560]/20"
        >
          Commencer à jouer
        </Link>
        {!isAuthenticated && (
          <button
            onClick={() => openAuthModal('register')}
            className="px-8 py-4 rounded-xl border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors"
          >
            Créer un compte
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl w-full">
        {[
          { label: '5 langages', desc: 'HTML, CSS, JS, PHP, SQL' },
          { label: '3 niveaux', desc: 'Facile, Moyen, Difficile' },
          { label: 'Classements', desc: 'Compare-toi aux autres' },
        ].map(({ label, desc }) => (
          <div key={label} className="bg-[#16213e] rounded-xl p-6 border border-white/5">
            <p className="text-2xl font-bold text-[#e94560] mb-1">{label}</p>
            <p className="text-white/50 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
