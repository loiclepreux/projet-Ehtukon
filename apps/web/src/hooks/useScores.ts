import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { LeaderboardResponse, Theme, Niveau } from '@ehtukon/shared';

export function useLeaderboard(theme: Theme, niveau: Niveau) {
  return useQuery({
    queryKey: ['leaderboard', theme, niveau],
    queryFn: () =>
      api
        .get<LeaderboardResponse['entries']>('/scores/leaderboard', {
          params: { theme, niveau, limit: 10 },
        })
        .then((r) => r.data),
  });
}
