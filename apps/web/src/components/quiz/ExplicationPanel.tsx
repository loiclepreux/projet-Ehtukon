interface Props {
  explication: string;
  isCorrect: boolean;
}

export function ExplicationPanel({ explication, isCorrect }: Props) {
  return (
    <div
      className={`rounded-xl p-4 border mt-4 ${
        isCorrect
          ? 'bg-green-500/10 border-green-500/30 text-green-300'
          : 'bg-red-500/10 border-red-500/30 text-red-300'
      }`}
    >
      <p className="font-semibold mb-1">{isCorrect ? '✓ Bonne réponse !' : '✗ Mauvaise réponse'}</p>
      <p className="text-sm text-white/70">{explication}</p>
    </div>
  );
}
