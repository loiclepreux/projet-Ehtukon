import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { AuthResponse } from '@ehtukon/shared';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001';

function AuthGuard() {
  const { isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const tryRefresh = async () => {
      const refreshToken = await SecureStore.getItemAsync('refresh_token');
      if (!refreshToken) {
        clearAuth();
        return;
      }
      try {
        const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/refresh`, null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        setAuth(data.user, data.accessToken);
        await SecureStore.setItemAsync('refresh_token', data.refreshToken);
      } catch {
        clearAuth();
        await SecureStore.deleteItemAsync('refresh_token');
      }
    };
    tryRefresh();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
