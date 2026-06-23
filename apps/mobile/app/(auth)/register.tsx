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
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useRegister } from '../../hooks/useAuth';

export default function RegisterScreen() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useRegister();

  const handleSubmit = () => {
    if (!nom || !email || !password) return;
    if (password.length < 8) {
      Alert.alert('Erreur', 'Le mot de passe doit faire au moins 8 caractères');
      return;
    }
    register.mutate(
      { nom, email, password },
      { onError: () => Alert.alert('Erreur', 'Cet email est déjà utilisé') },
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.logo}>
          <Text style={styles.logoAccent}>E</Text>htukon
        </Text>
        <Text style={styles.subtitle}>Créer un compte</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#ffffff40"
          value={nom}
          onChangeText={setNom}
          autoCapitalize="words"
        />
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
          placeholder="Mot de passe (8 min)"
          placeholderTextColor="#ffffff40"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, register.isPending && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={register.isPending}
        >
          <Text style={styles.buttonText}>
            {register.isPending ? 'Inscription...' : "S'inscrire"}
          </Text>
        </TouchableOpacity>

        <Link href="/(auth)/login" style={styles.link}>
          Déjà un compte ? Se connecter
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  inner: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 40 },
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
