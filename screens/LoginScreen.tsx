import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

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

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('@user_data');
      if (storedUserData !== null) {
        const userData = JSON.parse(storedUserData);
        if (userData.email === email && userData.password === password) {
          await AsyncStorage.setItem('userToken', 'fake-jwt-token');
          navigation.replace('Home'); 
        } else {
          Alert.alert('Hata', 'E-posta veya şifre yanlış!');
        }
      } else {
        Alert.alert('Hata', 'Sistemde kayıtlı kullanıcı bulunamadı.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Giriş yapılırken bir sorun oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        
        {/* PARÇACIKLARI BURAYA EKLİYORUZ - Mavi Renkte */}
        <FloatingParticles color="#3b82f6" />

        {/* Üst Başlık ve Logo Alanı */}
        <View style={styles.headerContainer}>
          <Ionicons name="ticket" size={70} color="#3b82f6" style={styles.logoIcon} />
          <Text style={styles.title}>Hoş Geldin!</Text>
          <Text style={styles.subtitle}>Etkinlik dünyasını keşfetmeye başla.</Text>
        </View>

        {/* Form Alanı */}
        <View style={styles.formContainer}>
          
          <View style={[styles.inputContainer, isEmailFocused && styles.inputFocused]}>
            <Ionicons name="mail-outline" size={22} color={isEmailFocused ? '#3b82f6' : '#9ca3af'} style={styles.icon} />
            <TextInput 
              style={styles.input} placeholder="E-posta" keyboardType="email-address" autoCapitalize="none" 
              value={email} onChangeText={setEmail} onFocus={() => setIsEmailFocused(true)} onBlur={() => setIsEmailFocused(false)}
            />
          </View>

          <View style={[styles.inputContainer, isPasswordFocused && styles.inputFocused]}>
            <Ionicons name="lock-closed-outline" size={22} color={isPasswordFocused ? '#3b82f6' : '#9ca3af'} style={styles.icon} />
            <TextInput 
              style={styles.input} placeholder="Şifre" secureTextEntry 
              value={password} onChangeText={setPassword} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkTextRegular}>Hesabın yok mu? </Text>
            <Text style={styles.linkTextBold}>Yeni Kayıt Oluştur</Text>
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', paddingHorizontal: 30 },
  headerContainer: { alignItems: 'center', marginBottom: 40 },
  logoIcon: { marginBottom: 15 },
  title: { fontSize: 34, fontWeight: '800', color: '#1e293b', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748b' },
  formContainer: { width: '100%' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 14, marginBottom: 16, paddingHorizontal: 15, height: 60, borderWidth: 1.5, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  inputFocused: { borderColor: '#3b82f6', shadowOpacity: 0.1 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#334155', height: '100%' },
  button: { backgroundColor: '#3b82f6', borderRadius: 14, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4 },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 18 },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  linkTextRegular: { color: '#64748b', fontSize: 15 },
  linkTextBold: { color: '#3b82f6', fontSize: 15, fontWeight: '700' }
});

export default LoginScreen;