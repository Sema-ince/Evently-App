import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';
import CustomTabBar from '../components/CustomTabBar'; // Alt menümüz

const ProfileScreen = ({ navigation }: any) => {
  const { colors } = useContext(ThemeContext);
  const [userName, setUserName] = useState('Kullanıcı');
  const [userEmail, setUserEmail] = useState('');
  
  // Bildirimler için görsel state
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    // Profil sayfası açıldığında veriyi yenile
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('@user_data');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.name) {
          setUserName(userData.name);
        } else if (userData.email) {
          const nameFromEmail = userData.email.split('@')[0];
          setUserName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
        }
        setUserEmail(userData.email || '');
      }
    } catch (error) {
      console.log("Kullanıcı verisi yüklenirken hata:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan güvenle çıkış yapmak istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Çıkış Yap", 
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem('@user_data');
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Üst Kısım: Avatar ve Kimlik Bilgileri */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
            style={styles.avatar} 
          />
          <Text style={[styles.name, { color: colors.text }]}>{userName}</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>{userEmail}</Text>
        </View>

        {/* Ayarlar Listesi */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Hesap Ayarları</Text>

          {/* Profili Düzenle */}
          <TouchableOpacity 
            style={[styles.settingRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" size={24} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>Profili Düzenle</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Bildirimler */}
          <View style={[styles.settingRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text }]}>Bildirimler</Text>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={(val) => setNotifications(val)} 
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </View>

        {/* Çıkış Yap Butonu */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.card }]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>

        {/* Geliştirici İmzası */}
        <Text style={styles.signature}>Sema tarafından geliştirildi - v1.0.0</Text>
      </ScrollView>

      {/* Alt Menü */}
      <CustomTabBar state={{ index: 3 }} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 40 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, backgroundColor: '#e5e7eb' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  email: { fontSize: 16 },
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, paddingLeft: 5 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderRadius: 12, marginBottom: 10, borderBottomWidth: 1 },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingText: { fontSize: 16, marginLeft: 15, fontWeight: '500' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, paddingVertical: 15, borderRadius: 12, marginTop: 10 },
  logoutText: { fontSize: 18, fontWeight: 'bold', color: '#ef4444', marginLeft: 10 },
  signature: { textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 40, marginBottom: 30 }
});

export default ProfileScreen;