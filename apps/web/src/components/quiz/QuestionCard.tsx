import { Question } from '@ehtukon/shared';
import { cn } from '../../lib/utils';

interface Props {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  showResult: boolean;
}

export function QuestionCard({ question, selectedAnswer, onAnswer, showResult }: Props) {
  const answers = [question.rep1, question.rep2, question.rep3, question.rep4];

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg font-semibold text-white leading-relaxed">{question.question}</p>

      <div className="grid grid-cols-1 gap-3">
        {answers.map((answer, index) => {
          const answerIndex = index + 1;
          const isSelected = selectedAnswer === answerIndex;
          const isCorrect = question.repCorrecte === answerIndex;

          return (
            <button
              key={index}
              onClick={() => onAnswer(answerIndex)}
              disabled={showResult}
              className={cn(
                'w-full p-4 rounded-xl border text-left text-sm font-medium transition-all',
                !showResult && 'hover:border-[#e94560] hover:bg-[#e94560]/10 border-white/10 bg-white/5 text-white',
                showResult && isCorrect && 'border-green-500 bg-green-500/20 text-green-300',
                showResult && isSelected && !isCorrect && 'border-red-500 bg-red-500/20 text-red-300',
                showResult && !isSelected && !isCorrect && 'border-white/5 bg-white/3 text-white/40',
              )}
            >
              <span className="mr-3 font-bold text-[#e94560]">
                {String.fromCharCode(65 + index)}.
              </span>
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}
