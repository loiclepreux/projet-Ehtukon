import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Theme, Niveau, LeaderboardEntry } from '@ehtukon/shared';
import api from '../../lib/axios';

const THEME_LABELS: Record<Theme, string> = {
  [Theme.HTML]: 'HTML',
  [Theme.CSS]: 'CSS',
  [Theme.JAVASCRIPT]: 'JavaScript',
  [Theme.PHP]: 'PHP',
  [Theme.SQL]: 'SQL',
};

const THEMES = Object.values(Theme);
const NIVEAUX = Object.values(Niveau);

function useLeaderboard(theme: Theme, niveau: Niveau) {
  return useQuery({
    queryKey: ['leaderboard', theme, niveau],
    queryFn: () =>
      api.get<LeaderboardEntry[]>('/scores/leaderboard', { params: { theme, niveau, limit: 10 } }).then((r) => r.data),
  });
}

function LeaderboardPanel({ theme, niveau }: { theme: Theme; niveau: Niveau }) {
  const { data, isLoading } = useLeaderboard(theme, niveau);

  if (isLoading) return <ActivityIndicator color="#e94560" style={{ marginVertical: 16 }} />;
  if (!data?.length) return <Text style={styles.empty}>Aucun score</Text>;

  return (
    <>
      {data.map((entry) => (
        <View key={entry.rank} style={styles.entry}>
          <Text style={[styles.rank, entry.rank <= 3 && { color: '#e94560' }]}>#{entry.rank}</Text>
          <Text style={styles.entryName}>{entry.user.nom}</Text>
          <Text style={styles.entryScore}>{entry.points}/{entry.total}</Text>
        </View>
      ))}
    </>
  );
}

export default function ScoresScreen() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [selectedNiveau, setSelectedNiveau] = useState<Niveau>(Niveau.FACILE);
  const currentTheme = THEMES[themeIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Classements</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeTabs}>
        {THEMES.map((theme, i) => (
          <TouchableOpacity
            key={theme}
            onPress={() => setThemeIndex(i)}
            style={[styles.themeTab, i === themeIndex && styles.themeTabActive]}
          >
            <Text style={[styles.themeTabText, i === themeIndex && styles.themeTabTextActive]}>
              {THEME_LABELS[theme]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.niveauTabs}>
        {NIVEAUX.map((niveau) => (
          <TouchableOpacity
            key={niveau}
            onPress={() => setSelectedNiveau(niveau)}
            style={[styles.niveauTab, selectedNiveau === niveau && styles.niveauTabActive]}
          >
            <Text style={[styles.niveauTabText, selectedNiveau === niveau && styles.niveauTabTextActive]}>
              {niveau.charAt(0).toUpperCase() + niveau.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.leaderboard}>
        <LeaderboardPanel theme={currentTheme} niveau={selectedNiveau} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { paddingTop: 60, paddingBottom: 40 },
  title: { color: '#ffffff', fontSize: 28, fontWeight: '800', paddingHorizontal: 20, marginBottom: 20 },
  themeTabs: { paddingHorizontal: 20, marginBottom: 16 },
  themeTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ffffff15', marginRight: 8 },
  themeTabActive: { backgroundColor: '#e94560', borderColor: '#e94560' },
  themeTabText: { color: '#ffffff60', fontWeight: '600', fontSize: 13 },
  themeTabTextActive: { color: '#ffffff' },
  niveauTabs: { flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginBottom: 20 },
  niveauTab: { flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ffffff10', alignItems: 'center' },
  niveauTabActive: { backgroundColor: '#16213e', borderColor: '#e94560' },
  niveauTabText: { color: '#ffffff40', fontWeight: '600', fontSize: 12 },
  niveauTabTextActive: { color: '#e94560' },
  leaderboard: { paddingHorizontal: 20 },
  entry: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ffffff08' },
  rank: { width: 32, color: '#ffffff40', fontWeight: '700', fontSize: 13 },
  entryName: { flex: 1, color: '#ffffffcc', fontSize: 14 },
  entryScore: { color: '#e94560', fontWeight: '700', fontSize: 14 },
  empty: { color: '#ffffff30', textAlign: 'center', marginVertical: 20 },
});
