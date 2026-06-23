import { Theme } from '@ehtukon/shared';
import { ThemeCard } from '../components/quiz/ThemeCard';

export function JouerPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-2">Choisissez un quiz</h1>
      <p className="text-white/50 mb-10">Sélectionnez un langage et un niveau de difficulté</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(Theme).map((theme) => (
          <ThemeCard key={theme} theme={theme} />
        ))}
      </div>
    </div>
  );
}
