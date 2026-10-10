import type { QuestionPublic } from "@ehtukon/shared";

interface Props {
    question: QuestionPublic;
    selectedAnswer: number | null;
    correctAnswer: number | null;
    onAnswer: (index: number) => void;
    showResult: boolean;
}

export function QuestionCard({
    question,
    selectedAnswer,
    correctAnswer,
    onAnswer,
    showResult,
}: Props) {
    const answers = [
        question.rep1,
        question.rep2,
        question.rep3,
        question.rep4,
    ];

    return (
        <div className="flex flex-col gap-4">
            <div
                className="rounded border text-center text-lg font-semibold p-3"
                style={{
                    backgroundColor: "rgb(168,163,163)",
                    border: "1px solid black",
                    color: "black",
                }}
            >
                {question.question}
            </div>

            <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
            >
                {answers.map((answer, index) => {
                    const answerIndex = index + 1;
                    const isSelected = selectedAnswer === answerIndex;
                    const isCorrect = correctAnswer === answerIndex;

                    let bg = "rgb(168,163,163)";
                    let color = "black";
                    if (showResult && isCorrect) {
                        bg = "rgb(127,255,170)";
                    } else if (showResult && isSelected && !isCorrect) {
                        bg = "rgb(228,79,79)";
                    } else if (showResult) {
                        bg = "rgb(200,195,195)";
                        color = "#666";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => onAnswer(answerIndex)}
                            disabled={selectedAnswer !== null}
                            className="p-3 rounded border text-left font-medium cursor-pointer transition-colors"
                            style={{
                                backgroundColor: bg,
                                color,
                                border: "1px solid black",
                                opacity:
                                    showResult && !isSelected && !isCorrect
                                        ? 0.6
                                        : 1,
                            }}
                            onMouseOver={(e) => {
                                if (!showResult)
                                    e.currentTarget.style.backgroundColor =
                                        "rgb(128,123,123)";
                            }}
                            onMouseOut={(e) => {
                                if (!showResult)
                                    e.currentTarget.style.backgroundColor =
                                        "rgb(168,163,163)";
                            }}
                        >
                            <span className="font-bold mr-2">
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
