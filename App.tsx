import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { FavoritesProvider } from './context/FavoritesContext';
import { TicketProvider } from './context/TicketContext';
// 1. ThemeProvider'ı içeri aktarıyoruz
import { ThemeProvider } from './context/ThemeContext'; 

export default function App() {
  return (
    // 2. Uygulamanın en dışına ana şalteri (ThemeProvider) takıyoruz
    <ThemeProvider>
      <FavoritesProvider>
        <TicketProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </TicketProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}