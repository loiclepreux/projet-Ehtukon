import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';
import { useLogin } from '../../hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  const handleSubmit = () => {
    if (!email || !password) return;
    login.mutate(
      { email, password },
      { onError: () => Alert.alert('Erreur', 'Identifiants invalides') },
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.logo}>
          <Text style={styles.logoAccent}>E</Text>htukon
        </Text>
        <Text style={styles.subtitle}>Connectez-vous pour jouer</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ffffff40"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#ffffff40"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, login.isPending && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={login.isPending}
        >
          <Text style={styles.buttonText}>
            {login.isPending ? 'Connexion...' : 'Se connecter'}
          </Text>
        </TouchableOpacity>

        <Link href="/(auth)/register" style={styles.link}>
          Pas encore de compte ? S'inscrire
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  logo: { fontSize: 40, fontWeight: '800', color: '#ffffff', textAlign: 'center', marginBottom: 8 },
  logoAccent: { color: '#e94560' },
  subtitle: { color: '#ffffff60', textAlign: 'center', marginBottom: 40, fontSize: 16 },
  input: {
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#ffffff15',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e94560',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
  link: { color: '#ffffff60', textAlign: 'center', marginTop: 24, fontSize: 14 },
});
