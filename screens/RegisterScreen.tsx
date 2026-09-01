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

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const userData = { name, email, password };
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      
      Alert.alert('Başarılı', 'Kayıt işlemi tamamlandı! Şimdi giriş yapabilirsiniz.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Hata', 'Kayıt sırasında bir sorun oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        
        {/* PARÇACIKLARI BURAYA EKLİYORUZ - Yeşil Renkte */}
        <FloatingParticles color="#10b981" />

        <View style={styles.headerContainer}>
          <Ionicons name="person-add" size={70} color="#10b981" style={styles.logoIcon} />
          <Text style={styles.title}>Hesap Oluştur</Text>
          <Text style={styles.subtitle}>Aramıza katılmak için bilgilerini gir.</Text>
        </View>

        <View style={styles.formContainer}>
          
          <View style={[styles.inputContainer, isNameFocused && styles.inputFocused]}>
            <Ionicons name="person-outline" size={22} color={isNameFocused ? '#10b981' : '#9ca3af'} style={styles.icon} />
            <TextInput style={styles.input} placeholder="Ad Soyad" value={name} onChangeText={setName} onFocus={() => setIsNameFocused(true)} onBlur={() => setIsNameFocused(false)} />
          </View>

          <View style={[styles.inputContainer, isEmailFocused && styles.inputFocused]}>
            <Ionicons name="mail-outline" size={22} color={isEmailFocused ? '#10b981' : '#9ca3af'} style={styles.icon} />
            <TextInput style={styles.input} placeholder="E-posta" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} onFocus={() => setIsEmailFocused(true)} onBlur={() => setIsEmailFocused(false)} />
          </View>

          <View style={[styles.inputContainer, isPasswordFocused && styles.inputFocused]}>
            <Ionicons name="lock-closed-outline" size={22} color={isPasswordFocused ? '#10b981' : '#9ca3af'} style={styles.icon} />
            <TextInput style={styles.input} placeholder="Şifre" secureTextEntry value={password} onChangeText={setPassword} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkTextRegular}>Zaten hesabın var mı? </Text>
            <Text style={styles.linkTextBold}>Giriş Yap</Text>
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
  inputFocused: { borderColor: '#10b981', shadowOpacity: 0.1 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#334155', height: '100%' },
  button: { backgroundColor: '#10b981', borderRadius: 14, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4 },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 18 },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  linkTextRegular: { color: '#64748b', fontSize: 15 },
  linkTextBold: { color: '#10b981', fontSize: 15, fontWeight: '700' }
});

export default RegisterScreen;