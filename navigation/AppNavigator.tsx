import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from '../context/ThemeContext'; // YENİ: Tema merkezi eklendi
import ChatbotScreen from '../screens/ChatbotScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TicketDetailScreen from '../screens/TicketDetailScreen';
import TicketsScreen from '../screens/TicketScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // YENİ: Temadan renkleri çekiyoruz
  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      // YENİ: Tüm üst başlıkları (header) temaya bağlayan genel ayar
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card, // Başlığın arka plan rengi (Gece modunda koyu gri olur)
          elevation: 0, // Android'de altındaki gölgeyi kaldırır (daha modern durur)
          shadowOpacity: 0, // iOS'ta altındaki çizgiyi kaldırır
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text, // Geri butonu (<) ve yazı rengi
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: { backgroundColor: colors.background } // Sayfa geçişlerindeki flaşlamayı engeller
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Etkinlikler', headerShown: false }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Etkinlik Detayı' }} />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ title: 'Akıllı Asistan' }} />
      {/* Biletlerim ve Favoriler sayfalarının kendi iç başlıkları olduğu için ikili başlık çıkmasın diye headerShown: false eklendi */}
      <Stack.Screen name="Tickets" component={TicketsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;