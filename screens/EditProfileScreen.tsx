import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const EditProfileScreen = ({ navigation }: any) => {
  const { colors } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // YENİ: Şifre değiştirme state'leri
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('@user_data');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setName(userData.name || '');
        setEmail(userData.email || '');
      }
    } catch (error) {
      console.log("Kullanıcı verisi yüklenirken hata:", error);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Hata', 'Lütfen ad ve e-posta alanlarını boş bırakmayın.');
      return;
    }

    // YENİ: Şifre girilmişse ama birbiriyle uyuşmuyorsa hata ver
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        Alert.alert('Hata', 'Girdiğiniz şifreler birbiriyle uyuşmuyor.');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Hata', 'Şifreniz en az 6 karakter olmalıdır.');
        return;
      }
    }

    try {
      const storedUserData = await AsyncStorage.getItem('@user_data');
      let userData = storedUserData ? JSON.parse(storedUserData) : {};
      
      userData.name = name;
      userData.email = email;
      
      // Eğer kullanıcı yeni bir şifre girdiyse onu da kaydet
      if (password) {
        userData.password = password;
      }

      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      
      // YENİ: Tam olarak istediğin başarı mesajı
      Alert.alert('Başarılı', 'Değişiklikler kaydedildi!', [
        { text: 'Tamam', onPress: () => navigation.goBack() } 
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Bilgiler kaydedilirken bir sorun oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profili Düzenle</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Ekran küçük telefonlarda sığsın diye ScrollView içine aldık */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        
        <Text style={[styles.label, { color: colors.textSecondary }]}>Ad Soyad</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="person-outline" size={20} color={colors.primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Örn: Adınız Soyadınız"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>E-Posta Adresi</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="E-posta adresiniz"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* YENİ: Şifre Değiştirme Alanı */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Şifre Değiştir</Text>
        <Text style={[styles.subText, { color: colors.textSecondary }]}>Şifrenizi değiştirmek istemiyorsanız boş bırakabilirsiniz.</Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Yeni Şifre</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Yeni şifreniz"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Yeni Şifre (Tekrar)</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Yeni şifrenizi tekrar girin"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Kaydet Butonu */}
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  formContainer: { padding: 25, paddingBottom: 50 },
  label: { fontSize: 14, marginBottom: 8, fontWeight: '600', marginLeft: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, marginBottom: 20, paddingHorizontal: 15, height: 55 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  divider: { height: 1, marginVertical: 10, opacity: 0.5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  subText: { fontSize: 12, marginBottom: 20, fontStyle: 'italic' },
  saveButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  saveButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});

export default EditProfileScreen;