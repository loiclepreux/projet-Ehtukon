import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Theme, Niveau } from '@ehtukon/shared';
import { useLeaderboard } from '../hooks/useScores';

const THEME_LABELS: Record<Theme, string> = {
  [Theme.HTML]: 'HTML',
  [Theme.CSS]: 'CSS',
  [Theme.JAVASCRIPT]: 'JavaScript',
  [Theme.PHP]: 'PHP',
  [Theme.SQL]: 'SQL',
};

const THEMES = Object.values(Theme);
const NIVEAUX = Object.values(Niveau);

function LeaderboardPanel({ theme, niveau }: { theme: Theme; niveau: Niveau }) {
  const { data, isLoading } = useLeaderboard(theme, niveau);

  if (isLoading) {
    return <div className="text-white/30 text-sm text-center py-4 animate-pulse">Chargement...</div>;
  }

  if (!data?.length) {
    return <div className="text-white/30 text-sm text-center py-4">Aucun score encore</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map((entry) => (
        <li key={entry.rank} className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold w-6 text-center ${
                entry.rank === 1 ? 'text-yellow-400' : entry.rank === 2 ? 'text-gray-300' : entry.rank === 3 ? 'text-amber-600' : 'text-white/30'
              }`}
            >
              #{entry.rank}
            </span>
            <span className="text-white/80 text-sm">{entry.user.nom}</span>
          </div>
          <span className="text-[#e94560] font-semibold text-sm">
            {entry.points}/{entry.total}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ScoresPage() {
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = THEMES[themeIndex];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-2">Classements</h1>
      <p className="text-white/50 mb-10">Top 10 par langage et niveau de difficulté</p>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setThemeIndex((i) => (i - 1 + THEMES.length) % THEMES.length)}
          className="p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-white flex-1 text-center">
          {THEME_LABELS[currentTheme]}
        </h2>
        <button
          onClick={() => setThemeIndex((i) => (i + 1) % THEMES.length)}
          className="p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NIVEAUX.map((niveau) => (
          <div key={niveau} className="bg-[#16213e] rounded-xl border border-white/5 p-5">
            <h3 className="text-[#e94560] font-semibold mb-4 capitalize">
              {niveau.charAt(0).toUpperCase() + niveau.slice(1)}
            </h3>
            <LeaderboardPanel theme={currentTheme} niveau={niveau} />
          </div>
        ))}
      </div>
    </div>
  );
}
