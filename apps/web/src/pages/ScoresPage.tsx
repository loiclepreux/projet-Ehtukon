import { useState, type CSSProperties } from 'react';
import { Theme, Niveau } from '@ehtukon/shared';
import { useLeaderboard } from '../hooks/useScores';

const THEME_LABELS: Record<Theme, string> = {
  [Theme.HTML]: 'HTML', [Theme.CSS]: 'CSS', [Theme.JAVASCRIPT]: 'JavaScript',
  [Theme.PHP]: 'PHP', [Theme.SQL]: 'SQL',
};

const THEMES = Object.values(Theme);
const NIVEAUX = Object.values(Niveau);

const NIVEAU_COLORS: Record<Niveau, string> = {
  [Niveau.FACILE]: 'rgb(127,255,170)',
  [Niveau.MOYEN]: 'rgb(240,144,81)',
  [Niveau.DIFFICILE]: 'rgb(228,79,79)',
};

function LeaderboardPanel({ theme, niveau }: { theme: Theme; niveau: Niveau }) {
  const { data, isLoading } = useLeaderboard(theme, niveau);

  return (
    <div
      className="rounded-2xl border-2 p-4 flex flex-col"
      style={{ borderColor: '#4d4b4b', backgroundColor: 'rgb(168,163,163)' }}
    >
      <p
        className="text-center font-bold mb-3 rounded border py-1"
        style={{ backgroundColor: NIVEAU_COLORS[niveau], borderColor: '#4d4b4b', color: 'black' }}
      >
        {niveau.charAt(0).toUpperCase() + niveau.slice(1)}
      </p>
      {isLoading ? (
        <p className="text-center text-sm py-2" style={{ color: '#444' }}>Chargement...</p>
      ) : !data?.length ? (
        <p className="text-center text-sm py-2" style={{ color: '#333' }}>Aucun score encore</p>
      ) : (
        <ul className="list-none p-0 m-0">
          {data.map((entry) => (
            <li
              key={entry.rank}
              className="flex justify-between items-center py-2"
              style={{ borderBottom: '1px solid #4d4b4b' }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="font-bold text-sm shrink-0 w-6 text-center"
                  style={{
                    color: entry.rank <= 3 ? '#ce5867' : '#333',
                    textShadow: entry.rank <= 3 ? '0 0 8px rgba(206,88,103,0.9)' : 'none',
                  }}
                >
                  #{entry.rank}
                </span>
                <span className="text-sm font-medium truncate" style={{ color: '#111' }}>
                  {entry.user.nom}
                </span>
              </div>
              <span className="font-bold text-sm shrink-0 ml-2" style={{ color: '#333' }}>
                {entry.points}/{entry.total}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const carouselBtnStyle: CSSProperties = {
  backgroundColor: '#95acc4', color: 'black', border: '2px solid #4d4b4b',
  width: '44px', height: '44px', fontSize: '24px', lineHeight: '1',
  borderRadius: '8px', cursor: 'pointer', flexShrink: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

export function ScoresPage() {
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = THEMES[themeIndex];

  return (
    <div style={{ overflowX: 'hidden' }}>
      <h2
        className="text-center font-bold border-2 rounded-2xl mx-auto mb-6"
        style={{
          borderColor: '#4d4b4b', backgroundColor: 'rgb(168,163,163)',
          padding: '10px', fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', color: '#333',
          width: '100%', maxWidth: '600px',
        }}
      >
        Classements
      </h2>

      <div className="flex items-center mb-6" style={{ gap: '8px' }}>
        <button
          style={carouselBtnStyle}
          onClick={() => setThemeIndex((i) => (i - 1 + THEMES.length) % THEMES.length)}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ce5867')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#95acc4')}
        >
          ‹
        </button>
        <h3
          className="text-center font-bold border-2 rounded-2xl"
          style={{
            borderColor: '#4d4b4b', backgroundColor: 'rgb(168,163,163)',
            padding: '8px 16px', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#333',
            flex: '1 1 0', minWidth: 0,
          }}
        >
          {THEME_LABELS[currentTheme]}
        </h3>
        <button
          style={carouselBtnStyle}
          onClick={() => setThemeIndex((i) => (i + 1) % THEMES.length)}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ce5867')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#95acc4')}
        >
          ›
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {NIVEAUX.map((niveau) => (
          <LeaderboardPanel key={niveau} theme={currentTheme} niveau={niveau} />
        ))}
      </div>
    </div>
  );
}
