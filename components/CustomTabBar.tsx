import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext'; // YENİ: Tema merkezi eklendi

export default function CustomTabBar({ state, navigation }: any) {
  // YENİ: Renk paletini çekiyoruz
  const { colors } = useContext(ThemeContext);

  const activeColor = colors.primary; // Seçili sekme rengi
  const inactiveColor = colors.textSecondary; // Seçili olmayan sekme rengi

  return (
    <View style={[styles.tabContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      {/* 1. Sekme: Ana Sayfa / Keşfet */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons 
          name={state.index === 0 ? "home" : "home-outline"} 
          size={24} 
          color={state.index === 0 ? activeColor : inactiveColor} 
        />
        <Text style={[styles.tabText, { color: inactiveColor }, state.index === 0 && { color: activeColor, fontWeight: 'bold' }]}>Ana Sayfa</Text>
      </TouchableOpacity>

      {/* 2. Sekme: Favoriler */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigation.navigate('Favorites')}
      >
        <Ionicons 
          name={state.index === 1 ? "heart" : "heart-outline"} 
          size={24} 
          color={state.index === 1 ? "#ef4444" : inactiveColor} 
        />
        <Text style={[styles.tabText, { color: inactiveColor }, state.index === 1 && { color: "#ef4444", fontWeight: 'bold' }]}>Favoriler</Text>
      </TouchableOpacity>
      
      {/* 3. Sekme: Biletlerim */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigation.navigate('Tickets')}
      >
        <Ionicons 
          name={state.index === 2 ? "ticket" : "ticket-outline"} 
          size={24} 
          color={state.index === 2 ? activeColor : inactiveColor} 
        />
        <Text style={[styles.tabText, { color: inactiveColor }, state.index === 2 && { color: activeColor, fontWeight: 'bold' }]}>Biletlerim</Text>
      </TouchableOpacity>
      
      {/* 4. Sekme: Profil */}
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons 
          name={state.index === 3 ? "person" : "person-outline"} 
          size={24} 
          color={state.index === 3 ? activeColor : inactiveColor} 
        />
        <Text style={[styles.tabText, { color: inactiveColor }, state.index === 3 && { color: activeColor, fontWeight: 'bold' }]}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 25, 
    paddingTop: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
});