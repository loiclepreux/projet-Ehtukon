import { useSearchParams, Navigate, Link } from "react-router-dom";
import { Theme, Niveau } from "@ehtukon/shared";
import { useQuestions, useSubmitScore, useQuizEngine } from "../hooks/useQuiz";
import { QuestionCard } from "../components/quiz/QuestionCard";
import { ExplicationPanel } from "../components/quiz/ExplicationPanel";
import { QuizResult } from "../components/quiz/QuizResult";
import { useAuthStore } from "../store/authStore";
import { useEffect, useRef, type CSSProperties } from "react";

const NIVEAU_LABELS: Record<Niveau, string> = {
    [Niveau.FACILE]: "Facile",
    [Niveau.MOYEN]: "Moyen",
    [Niveau.DIFFICILE]: "Difficile",
};

const btnStyle: CSSProperties = {
    backgroundColor: "#95acc4",
    border: "2px solid #4d4b4b",
    borderRadius: "8px",
    padding: "8px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "Raleway, sans-serif",
};

export function QuestionnairePage() {
    const [params] = useSearchParams();
    const theme = params.get("theme") as Theme;
    const niveau = params.get("niveau") as Niveau;
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    const validThemes = Object.values(Theme) as string[];
    const validNiveaux = Object.values(Niveau) as string[];
    const isValidParams = !!(
        theme &&
        niveau &&
        validThemes.includes(theme) &&
        validNiveaux.includes(niveau)
    );

    // All hooks must be called unconditionally — guard returns come after
    const {
        data: questions,
        isLoading,
        error,
        refetch,
    } = useQuestions(
        (theme ?? "") as Theme,
        (niveau ?? "") as Niveau,
        isValidParams,
    );
    const submitScore = useSubmitScore();
    const quiz = useQuizEngine(questions ?? []);
    const hasSubmitted = useRef(false);

    useEffect(() => {
        if (questions && questions.length > 0 && quiz.state === "idle")
            quiz.start();
    }, [questions]);

    useEffect(() => {
        if (
            quiz.state === "complete" &&
            isAuthenticated &&
            questions?.length &&
            !hasSubmitted.current
        ) {
            hasSubmitted.current = true;
            submitScore.mutate({ theme, niveau, answers: quiz.answers });
        }
    }, [quiz.state, isAuthenticated]);

    const replay = () => {
        hasSubmitted.current = false;
        submitScore.reset();
        refetch();
        quiz.start();
    };

    if (!isValidParams) return <Navigate to="/jouer" replace />;

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <p className="text-xl animate-pulse" style={{ color: "#333" }}>
                    Chargement des questions...
                </p>
            </div>
        );
    }

    if (error || !questions?.length) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 text-lg">
                    Impossible de charger les questions.
                </p>
                <Link
                    to="/jouer"
                    style={btnStyle}
                    className="inline-block mt-4 no-underline text-black"
                >
                    ← Retour
                </Link>
            </div>
        );
    }

    if (quiz.state === "complete") {
        return (
            <QuizResult
                score={quiz.score}
                total={questions.length}
                scoreSaved={submitScore.isSuccess}
                onReplay={replay}
            />
        );
    }

    return (
        <div
            className="flex flex-col"
            style={{ maxWidth: "800px", margin: "0 auto" }}
        >
            <h2
                className="text-center font-bold border-2 rounded-xl mx-auto mb-4 w-full sm:w-4/5"
                style={{
                    borderColor: "#4d4b4b",
                    backgroundColor: "rgb(168,163,163)",
                    padding: "10px",
                    fontSize: "clamp(1rem, 4vw, 26px)",
                    color: "black",
                }}
            >
                {theme.toUpperCase()} — {NIVEAU_LABELS[niveau]}
            </h2>

            <h3
                className="text-center border rounded mx-auto mb-4 w-1/2 sm:w-1/3 md:w-1/4"
                style={{
                    borderColor: "black",
                    backgroundColor: "rgb(168,163,163)",
                    padding: "8px",
                    fontSize: "20px",
                    color: "black",
                    borderRadius: "5px",
                }}
            >
                Question {quiz.currentIndex + 1}/{questions.length}
            </h3>

            <div
                className="w-full rounded-full h-2 mb-6"
                style={{ backgroundColor: "#ddd" }}
            >
                <div
                    className="h-2 rounded-full"
                    style={{
                        width: `${((quiz.currentIndex + 1) / questions.length) * 100}%`,
                        backgroundColor: "#95acc4",
                        transition: "width 0.4s ease",
                        animation: "bar-glow 2s ease-in-out infinite",
                    }}
                />
            </div>

            {quiz.currentQuestion && (
                <>
                    <QuestionCard
                        question={quiz.currentQuestion}
                        selectedAnswer={quiz.selected}
                        correctAnswer={quiz.result?.repCorrecte ?? null}
                        onAnswer={quiz.answer}
                        showResult={quiz.state === "answered"}
                    />

                    {quiz.state === "answered" && quiz.result && (
                        <>
                            <ExplicationPanel
                                explication={quiz.result.explication}
                                isCorrect={quiz.result.correct}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={quiz.next}
                                    style={{ ...btnStyle, color: "black" }}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#ce5867")
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#95acc4")
                                    }
                                >
                                    {quiz.isLast
                                        ? "Voir les résultats →"
                                        : "Question suivante →"}
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
