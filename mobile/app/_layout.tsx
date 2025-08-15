import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import SplashScreen from './SplashScreen';

import { restoreKeys, authenticateUser } from '../services/authService';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const keys = await restoreKeys();
        if (keys) {
          const auth = await authenticateUser();
          setIsAuthenticated(auth);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Auth check failed', err);
        setIsAuthenticated(false);
      } finally {
        // Затримка для показу сплешу мінімум 1.5с (опціонально)
        setTimeout(() => setIsCheckingAuth(false), 1500);
      }
    })();
  }, []);

  // Поки шрифти або автентифікація не готові — показуємо сплеш
  if (!fontsLoaded || isCheckingAuth || isAuthenticated === null) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
