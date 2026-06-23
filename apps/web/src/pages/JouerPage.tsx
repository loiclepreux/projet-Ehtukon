import { Theme } from '@ehtukon/shared';
import { ThemeCard } from '../components/quiz/ThemeCard';

export function JouerPage() {
  return (
    <div>
      <h2
        className="text-center font-bold mb-8 pb-3 mx-auto"
        style={{
          borderBottom: '2px solid #4d4b4b',
          fontSize: 'clamp(1.2rem, 4vw, 2rem)', color: '#333',
          width: '75%',
        }}
      >
        Choisissez votre questionnaire
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(Theme).map((theme) => (
          <ThemeCard key={theme} theme={theme} />
        ))}
      </div>
    </div>
  );
}
