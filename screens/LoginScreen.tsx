import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // 1. Hafızadaki kullanıcı verisini çek
      const storedUserData = await AsyncStorage.getItem('@user_data');
      
      if (storedUserData !== null) {
        const userData = JSON.parse(storedUserData);
        
        // 2. Girilen bilgilerle hafızadakileri eşleştir
        if (userData.email === email && userData.password === password) {
          // 3. Eşleşme başarılıysa sisteme "Giriş yapıldı" işaretini (token) bırak
          await AsyncStorage.setItem('userToken', 'fake-jwt-token');
          navigation.replace('Home'); // Ana sayfaya yönlendir
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
    <View style={styles.container}>
      <Text style={styles.title}>Hoş Geldin!</Text>
      
      <TextInput style={styles.input} placeholder="E-posta" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Şifre" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Hesabın yok mu? Yeni Kayıt Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Tasarım Register sayfası ile tamamen aynı
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
  button: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#10b981', textAlign: 'center', marginTop: 20, fontWeight: '600' }
});

export default LoginScreen;