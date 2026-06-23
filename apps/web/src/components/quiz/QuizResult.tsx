import { Link } from 'react-router-dom';
import { Theme, Niveau } from '@ehtukon/shared';

interface Props {
  score: number;
  total: number;
  theme: Theme;
  niveau: Niveau;
}

export function QuizResult({ score, total, theme, niveau }: Props) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <h2 className="font-extrabold w-full sm:w-4/5 lg:w-3/5" style={{ fontSize: 'clamp(1.5em, 3vw, 3em)', color: '#333', border: '2px solid #4d4b4b', backgroundColor: '#f1eddf', borderRadius: '15px', padding: '10px' }}>
        Résultat : {score}/{total}
      </h2>
      <p className="text-xl font-semibold" style={{ color: '#555' }}>
        {percentage >= 80 ? '🏆 Excellent ! Tu maîtrises ce sujet.' : percentage >= 50 ? '👍 Bon travail, continue à t\'entraîner !' : '💪 Continue à pratiquer, tu vas y arriver !'}
      </p>

      <div className="flex gap-4 mt-4 flex-wrap justify-center">
        {[
          { to: `/questionnaire?theme=${theme}&niveau=${niveau}`, label: '🔄 Rejouer' },
          { to: '/jouer', label: '🎮 Autre quiz' },
          { to: '/scores', label: '🏅 Voir les scores' },
          { to: '/', label: '🏠 Accueil' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="px-6 py-3 rounded border-2 font-bold no-underline text-black"
            style={{ backgroundColor: '#95acc4', borderColor: '#4d4b4b', transition: 'background-color 0.2s, box-shadow 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = '#ce5867'; e.currentTarget.style.boxShadow = '0 0 14px rgba(206,88,103,0.7)'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = '#95acc4'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
