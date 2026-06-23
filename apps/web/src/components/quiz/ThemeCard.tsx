import { useNavigate } from 'react-router-dom';
import { Theme, Niveau } from '@ehtukon/shared';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';

const THEME_LABELS: Record<Theme, string> = {
  [Theme.HTML]: 'HTML',
  [Theme.CSS]: 'CSS',
  [Theme.JAVASCRIPT]: 'JavaScript',
  [Theme.PHP]: 'PHP',
  [Theme.SQL]: 'SQL',
};

const THEME_COLORS: Record<Theme, string> = {
  [Theme.HTML]: 'from-orange-500/20 to-orange-600/5 border-orange-500/30',
  [Theme.CSS]: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
  [Theme.JAVASCRIPT]: 'from-yellow-400/20 to-yellow-500/5 border-yellow-400/30',
  [Theme.PHP]: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
  [Theme.SQL]: 'from-green-500/20 to-green-600/5 border-green-500/30',
};

interface Props {
  theme: Theme;
}

export function ThemeCard({ theme }: Props) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openAuthModal = useUiStore((s) => s.openAuthModal);

  const handlePlay = (niveau: Niveau) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    navigate(`/questionnaire?theme=${theme}&niveau=${niveau}`);
  };

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br ${THEME_COLORS[theme]} p-6 flex flex-col gap-4`}
    >
      <h3 className="text-xl font-bold text-white">{THEME_LABELS[theme]}</h3>
      <div className="flex flex-col gap-2">
        {Object.values(Niveau).map((niveau) => (
          <button
            key={niveau}
            onClick={() => handlePlay(niveau)}
            className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-sm font-medium capitalize transition-colors"
          >
            {niveau.charAt(0).toUpperCase() + niveau.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
