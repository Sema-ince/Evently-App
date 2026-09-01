import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Renk Paletlerimiz (Gündüz ve Gece için)
export const lightColors = {
  background: '#f9fafb',
  card: '#ffffff',
  text: '#1f2937',
  textSecondary: '#6b7280',
  primary: '#10b981', // Bizim meşhur yeşilimiz (değişmez)
  border: '#e5e7eb',
};

export const darkColors = {
  background: '#111827',
  card: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  primary: '#10b981',
  border: '#374151',
};

// 2. Merkezin (Context) Kendisi
export const ThemeContext = createContext<any>(null);

// 3. Uygulamayı Saracak Sağlayıcı (Provider)
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Uygulama ilk açıldığında hafızadaki temayı kontrol et
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      }
    } catch (error) {
      console.log('Tema yüklenirken hata:', error);
    }
  };

  // Temayı değiştiren ve hafızaya kaydeden fonksiyon
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('appTheme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Tema kaydedilirken hata:', error);
    }
  };

  // Aktif olan renk paletini belirle
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};