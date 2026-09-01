import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // 1. Basit bir boşluk kontrolü
    if (!name || !email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      // 2. Kullanıcı objesini oluştur
      const userData = { name, email, password };
      
      // 3. Obje verisini string'e çevirip hafızaya kaydet
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      
      Alert.alert('Başarılı', 'Kayıt işlemi tamamlandı! Şimdi giriş yapabilirsiniz.');
      // 4. Kayıt başarılıysa Giriş ekranına yönlendir
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Hata', 'Kayıt sırasında bir sorun oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hesap Oluştur</Text>
      
      <TextInput style={styles.input} placeholder="Ad Soyad" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-posta" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Şifre" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
  button: { backgroundColor: '#10b981', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#3b82f6', textAlign: 'center', marginTop: 20, fontWeight: '600' }
});

export default RegisterScreen;