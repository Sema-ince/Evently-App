import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

// --- ARKA PLAN PARÇACIK ANİMASYONU BİLEŞENİ ---
const FloatingParticles = ({ color }: { color: string }) => {
  const particles = useRef(
    Array.from({ length: 20 }).map(() => ({
      translateY: new Animated.Value(height + 50),
      x: Math.random() * width,
      size: Math.random() * 12 + 5,
      opacity: new Animated.Value(0),
      speed: Math.random() * 6000 + 4000,
      delay: Math.random() * 4000,
    }))
  ).current;

  useEffect(() => {
    particles.forEach((p) => {
      const animate = () => {
        p.translateY.setValue(height + 50);
        p.opacity.setValue(0);

        Animated.parallel([
          Animated.sequence([
            Animated.timing(p.opacity, { toValue: Math.random() * 0.4 + 0.1, duration: 1500, useNativeDriver: true }),
            Animated.timing(p.opacity, { toValue: 0, duration: p.speed - 1500, useNativeDriver: true }),
          ]),
          Animated.timing(p.translateY, { toValue: -100, duration: p.speed, useNativeDriver: true })
        ]).start(() => animate());
      };
      setTimeout(animate, p.delay);
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            width: p.size,
            height: p.size,
            borderRadius: p.size / 2,
            backgroundColor: color,
            opacity: p.opacity,
            transform: [{ translateY: p.translateY }],
          }}
        />
      ))}
    </View>
  );
};
// ----------------------------------------------

const SplashScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState<string>('');
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('@user_data');
        
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          
          if (userData.name) {
            setUserName(userData.name);
          } else if (userData.email) {
            const nameFromEmail = userData.email.split('@')[0];
            const capitalized = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
            setUserName(capitalized);
          }
        }

        setTimeout(() => {
          if (storedUserData) {
            navigation.replace('Home');
          } else {
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
      
      {/* Temanın ana rengine göre dinamik parçacıklar */}
      <FloatingParticles color={colors.primary} />

      <Text style={[styles.appName, { color: colors.primary }]}>Evently</Text>
      
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