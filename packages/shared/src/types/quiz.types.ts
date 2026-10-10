import { Theme, Niveau } from "./enums";

export interface Question {
    id: number;
    theme: Theme;
    niveau: Niveau;
    question: string;
    rep1: string;
    rep2: string;
    rep3: string;
    rep4: string;
    repCorrecte: number;
    explication: string;
}

export type QuestionPublic = Omit<Question, "repCorrecte" | "explication">;

export interface AnswerResult {
    correct: boolean;
    repCorrecte: number;
    explication: string;
}

export interface QuizAnswer {
    questionId: number;
    answer: number;
}

export interface SubmitScoreDto {
    theme: Theme;
    niveau: Niveau;
    answers: QuizAnswer[];
}
