import { Theme, Niveau } from './enums';
import type { User } from './user.types';

export interface Score {
  id: number;
  userId: number;
  theme: Theme;
  niveau: Niveau;
  points: number;
  total: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, 'id' | 'nom'>;
  points: number;
  total: number;
  createdAt: string;
}

export interface LeaderboardResponse {
  theme: Theme;
  niveau: Niveau;
  entries: LeaderboardEntry[];
}
