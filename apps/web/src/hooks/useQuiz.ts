import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import api from '../lib/axios';
import type { Question, SubmitScoreDto } from '@ehtukon/shared';
import { Theme, Niveau } from '@ehtukon/shared';

type QuizState = 'idle' | 'playing' | 'answered' | 'complete';

export function useQuestions(theme: Theme, niveau: Niveau) {
  return useQuery({
    queryKey: ['questions', theme, niveau],
    queryFn: () =>
      api.get<Question[]>('/questions', { params: { theme, niveau } }).then((r) => r.data),
  });
}

export function useSubmitScore() {
  return useMutation({
    mutationFn: (dto: SubmitScoreDto) => api.post('/scores', dto).then((r) => r.data),
  });
}

export function useQuizEngine(questions: Question[]) {
  const [state, setState] = useState<QuizState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const start = useCallback(() => {
    setState('playing');
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
  }, []);

  const answer = useCallback(
    (index: number) => {
      if (state !== 'playing') return;
      setSelected(index);
      setState('answered');
      if (index === currentQuestion?.repCorrecte) {
        setScore((s) => s + 1);
      }
    },
    [state, currentQuestion],
  );

  const next = useCallback(() => {
    if (isLast) {
      setState('complete');
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setState('playing');
    }
  }, [isLast]);

  return { state, currentQuestion, currentIndex, selected, score, isLast, start, answer, next };
}
