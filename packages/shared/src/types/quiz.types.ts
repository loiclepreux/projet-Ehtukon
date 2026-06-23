import { Theme, Niveau } from './enums';

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

export interface QuestionPublic extends Omit<Question, 'repCorrecte' | 'explication'> {}

export interface SubmitScoreDto {
  theme: Theme;
  niveau: Niveau;
  points: number;
  total: number;
}
