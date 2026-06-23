import { useSearchParams, Navigate } from 'react-router-dom';
import { Theme, Niveau } from '@ehtukon/shared';
import { useQuestions, useSubmitScore, useQuizEngine } from '../hooks/useQuiz';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { ExplicationPanel } from '../components/quiz/ExplicationPanel';
import { QuizResult } from '../components/quiz/QuizResult';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export function QuestionnairePage() {
  const [params] = useSearchParams();
  const theme = params.get('theme') as Theme;
  const niveau = params.get('niveau') as Niveau;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const validThemes = Object.values(Theme) as string[];
  const validNiveaux = Object.values(Niveau) as string[];
  if (!theme || !niveau || !validThemes.includes(theme) || !validNiveaux.includes(niveau)) {
    return <Navigate to="/jouer" replace />;
  }

  const { data: questions, isLoading, error } = useQuestions(theme, niveau);
  const submitScore = useSubmitScore();
  const quiz = useQuizEngine(questions ?? []);

  useEffect(() => {
    if (questions && questions.length > 0 && quiz.state === 'idle') {
      quiz.start();
    }
  }, [questions]);

  useEffect(() => {
    if (quiz.state === 'complete' && isAuthenticated) {
      submitScore.mutate({ theme, niveau, points: quiz.score, total: questions!.length });
    }
  }, [quiz.state]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white/50 text-lg animate-pulse">Chargement des questions...</div>
      </div>
    );
  }

  if (error || !questions?.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-400">Impossible de charger les questions. Réessayez plus tard.</p>
      </div>
    );
  }

  if (quiz.state === 'complete') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <QuizResult score={quiz.score} total={questions.length} theme={theme} niveau={niveau} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <span className="text-white/40 text-sm capitalize">
          {theme} · {niveau}
        </span>
        <span className="text-white/60 text-sm font-medium">
          {quiz.currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-1 mb-8">
        <div
          className="bg-[#e94560] h-1 rounded-full transition-all"
          style={{ width: `${((quiz.currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {quiz.currentQuestion && (
        <>
          <QuestionCard
            question={quiz.currentQuestion}
            selectedAnswer={quiz.selected}
            onAnswer={quiz.answer}
            showResult={quiz.state === 'answered'}
          />

          {quiz.state === 'answered' && (
            <>
              <ExplicationPanel
                explication={quiz.currentQuestion.explication}
                isCorrect={quiz.selected === quiz.currentQuestion.repCorrecte}
              />
              <button
                onClick={quiz.next}
                className="mt-6 w-full py-3 rounded-xl bg-[#e94560] text-white font-semibold hover:bg-[#c73652] transition-colors"
              >
                {quiz.isLast ? 'Voir les résultats' : 'Question suivante →'}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
