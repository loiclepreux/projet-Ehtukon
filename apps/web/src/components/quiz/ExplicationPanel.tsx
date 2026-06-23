interface Props {
  explication: string;
  isCorrect: boolean;
}

export function ExplicationPanel({ explication, isCorrect }: Props) {
  return (
    <div
      className="rounded border mt-4 p-4"
      style={{
        backgroundColor: isCorrect ? 'rgb(127,255,170)' : 'rgb(228,79,79)',
        border: '1px solid black',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
        color: 'black',
      }}
    >
      <p className="font-bold mb-1">{isCorrect ? '✓ Bonne réponse !' : '✗ Mauvaise réponse'}</p>
      <p className="text-sm">{explication}</p>
    </div>
  );
}
