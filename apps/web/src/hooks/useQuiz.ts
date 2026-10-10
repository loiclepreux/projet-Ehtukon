import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import api from "../lib/axios";
import type {
    AnswerResult,
    QuestionPublic,
    QuizAnswer,
    SubmitScoreDto,
} from "@ehtukon/shared";
import { Theme, Niveau } from "@ehtukon/shared";

type QuizState = "idle" | "playing" | "checking" | "answered" | "complete";

export function useQuestions(theme: Theme, niveau: Niveau, enabled = true) {
    return useQuery({
        queryKey: ["questions", theme, niveau],
        queryFn: () =>
            api
                .get<
                    QuestionPublic[]
                >("/questions", { params: { theme, niveau } })
                .then((r) => r.data),
        enabled,
    });
}

export function useSubmitScore() {
    return useMutation({
        mutationFn: (dto: SubmitScoreDto) =>
            api.post("/scores", dto).then((r) => r.data),
    });
}

export function useQuizEngine(questions: QuestionPublic[]) {
    const [state, setState] = useState<QuizState>("idle");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [result, setResult] = useState<AnswerResult | null>(null);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const start = useCallback(() => {
        setState("playing");
        setCurrentIndex(0);
        setScore(0);
        setSelected(null);
        setResult(null);
        setAnswers([]);
    }, []);

    const answer = useCallback(
        async (index: number) => {
            if (state !== "playing" || !currentQuestion) return;
            setSelected(index);
            setState("checking");

            try {
                // C'est l'API qui dit si la réponse est juste
                const { data } = await api.post<AnswerResult>(
                    `/questions/${currentQuestion.id}/check`,
                    { answer: index },
                );
                setResult(data);
                setAnswers((prev) => [
                    ...prev,
                    { questionId: currentQuestion.id, answer: index },
                ]);
                if (data.correct) setScore((s) => s + 1);
                setState("answered");
            } catch {
                // En cas d'erreur réseau, on laisse le joueur réessayer
                setSelected(null);
                setState("playing");
            }
        },
        [state, currentQuestion],
    );

    const next = useCallback(() => {
        if (isLast) {
            setState("complete");
        } else {
            setCurrentIndex((i) => i + 1);
            setSelected(null);
            setResult(null);
            setState("playing");
        }
    }, [isLast]);

    return {
        state,
        currentQuestion,
        currentIndex,
        selected,
        result,
        answers,
        score,
        isLast,
        start,
        answer,
        next,
    };
}
