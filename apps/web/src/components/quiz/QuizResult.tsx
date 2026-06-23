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
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <div className="text-6xl font-extrabold text-white">
        {score}<span className="text-[#e94560]">/{total}</span>
      </div>
      <p className="text-xl text-white/70">
        {percentage >= 80
          ? 'Excellent ! Tu maîtrises ce sujet.'
          : percentage >= 50
            ? 'Bon travail, continue à t\'entraîner !'
            : 'Continue à pratiquer, tu vas y arriver !'}
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          to={`/questionnaire?theme=${theme}&niveau=${niveau}`}
          className="px-6 py-3 rounded-lg bg-[#e94560] text-white font-semibold hover:bg-[#c73652] transition-colors"
        >
          Rejouer
        </Link>
        <Link
          to="/jouer"
          className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
        >
          Choisir un autre quiz
        </Link>
        <Link
          to="/scores"
          className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
        >
          Voir les scores
        </Link>
      </div>
    </div>
  );
}
