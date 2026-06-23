import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Theme, Niveau } from '@ehtukon/shared';

const THEME_LABELS: Record<Theme, string> = {
  [Theme.HTML]: 'HTML',
  [Theme.CSS]: 'CSS',
  [Theme.JAVASCRIPT]: 'JavaScript',
  [Theme.PHP]: 'PHP',
  [Theme.SQL]: 'SQL',
};

const THEME_COLORS: Record<Theme, string> = {
  [Theme.HTML]: '#f97316',
  [Theme.CSS]: '#3b82f6',
  [Theme.JAVASCRIPT]: '#eab308',
  [Theme.PHP]: '#a855f7',
  [Theme.SQL]: '#22c55e',
};

const NIVEAU_LABELS: Record<Niveau, string> = {
  [Niveau.FACILE]: 'Facile',
  [Niveau.MOYEN]: 'Moyen',
  [Niveau.DIFFICILE]: 'Difficile',
};

export default function JouerScreen() {
  const router = useRouter();

  const handlePlay = (theme: Theme, niveau: Niveau) => {
    router.push(`/quiz/${theme}/${niveau}` as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Choisissez un quiz</Text>
      <Text style={styles.subtitle}>Sélectionnez un langage et un niveau</Text>

      {Object.values(Theme).map((theme) => (
        <View key={theme} style={[styles.card, { borderColor: THEME_COLORS[theme] + '40' }]}>
          <View style={[styles.cardHeader, { backgroundColor: THEME_COLORS[theme] + '20' }]}>
            <Text style={[styles.themeName, { color: THEME_COLORS[theme] }]}>
              {THEME_LABELS[theme]}
            </Text>
          </View>
          <View style={styles.niveauxRow}>
            {Object.values(Niveau).map((niveau) => (
              <TouchableOpacity
                key={niveau}
                style={styles.niveauBtn}
                onPress={() => handlePlay(theme, niveau)}
              >
                <Text style={styles.niveauText}>{NIVEAU_LABELS[niveau]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  title: { color: '#ffffff', fontSize: 28, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#ffffff50', fontSize: 14, marginBottom: 24 },
  card: { backgroundColor: '#16213e', borderRadius: 16, borderWidth: 1, marginBottom: 16, overflow: 'hidden' },
  cardHeader: { paddingHorizontal: 20, paddingVertical: 14 },
  themeName: { fontSize: 18, fontWeight: '700' },
  niveauxRow: { flexDirection: 'row', gap: 8, padding: 12 },
  niveauBtn: {
    flex: 1,
    backgroundColor: '#ffffff08',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff10',
  },
  niveauText: { color: '#ffffff80', fontSize: 12, fontWeight: '600' },
});
