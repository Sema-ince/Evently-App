import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const SplashScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState<string>('');
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Cihaza kaydedilmiş kullanıcı bilgisini çekiyoruz
        const storedUserData = await AsyncStorage.getItem('@user_data');
        
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          
          // Eğer kayıt olurken 'name' veya 'isim' kaydedildiyse onu al
          if (userData.name) {
            setUserName(userData.name);
          } 
          // Eğer isim yoksa ve sadece email varsa, emailden isim oluştur (ör: sema@... -> Sema)
          else if (userData.email) {
            const nameFromEmail = userData.email.split('@')[0];
            const capitalized = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
            setUserName(capitalized);
          }
        }

        // Kullanıcının selamlamayı okuyabilmesi için 2.5 saniye ekranda tutuyoruz
        setTimeout(() => {
          if (storedUserData) {
            // Giriş yapılmışsa doğrudan Home'a
            navigation.replace('Home');
          } else {
            // Giriş yapılmamışsa Login'e
            navigation.replace('Login');
          }
        }, 2500);

      } catch (error) {
        console.log("Splash Screen hatası:", error);
        navigation.replace('Login');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* İsteğe bağlı: Buraya uygulamanın bir logosunu ekleyebilirsin */}
      <Text style={[styles.appName, { color: colors.primary }]}>Etkinlik App</Text>
      
      {/* İSME ÖZEL SELAMLAMA KISMI */}
      <Text style={[styles.welcomeText, { color: colors.text }]}>
        {userName ? `Hoş geldin, ${userName}!` : 'Uygulamaya Hoş Geldiniz'}
      </Text>

      <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  }
});

export default SplashScreen;