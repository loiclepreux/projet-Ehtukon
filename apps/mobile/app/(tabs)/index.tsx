import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useLogout } from '../../hooks/useAuth';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Text style={styles.accent}>E</Text>htukon
      </Text>
      <Text style={styles.welcome}>Bonjour, {user?.nom} 👋</Text>
      <Text style={styles.subtitle}>
        Améliore tes compétences en programmation avec des quiz interactifs.
      </Text>

      <View style={styles.statsRow}>
        {[
          { label: '5 langages', sub: 'HTML, CSS, JS, PHP, SQL' },
          { label: '3 niveaux', sub: 'Facile → Difficile' },
        ].map(({ label, sub }) => (
          <View key={label} style={styles.statCard}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statSub}>{sub}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.cta} onPress={() => router.push('/(tabs)/jouer')}>
        <Text style={styles.ctaText}>Commencer à jouer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => logout.mutate()}
        disabled={logout.isPending}
      >
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { fontSize: 48, fontWeight: '800', color: '#ffffff', marginBottom: 8 },
  accent: { color: '#e94560' },
  welcome: { fontSize: 22, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
  subtitle: { color: '#ffffff50', textAlign: 'center', fontSize: 15, lineHeight: 22, marginBottom: 32 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 32, width: '100%' },
  statCard: { flex: 1, backgroundColor: '#16213e', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#ffffff10' },
  statLabel: { color: '#e94560', fontWeight: '700', fontSize: 16, marginBottom: 4 },
  statSub: { color: '#ffffff50', fontSize: 12 },
  cta: { backgroundColor: '#e94560', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 40, marginBottom: 16 },
  ctaText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
  logoutBtn: { padding: 12 },
  logoutText: { color: '#ffffff40', fontSize: 14 },
});
