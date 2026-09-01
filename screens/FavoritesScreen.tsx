import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// İkonlar ve Global Hafızamız
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../context/FavoritesContext';
import { ThemeContext } from '../context/ThemeContext'; // YENİ: Tema eklendi
// Etkinlik Verilerimiz
import { events } from '../data/dummyData';
import CustomTabBar from '../components/CustomTabBar';

const FavoritesScreen = ({ navigation }: any) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  // YENİ: Renkleri temadan çekiyoruz
  const { colors } = useContext(ThemeContext); 

  const favoriteEvents = events.filter(event => favorites.includes(event.id));

  // Liste boşsa gösterilecek ekran (Artık gece moduna uyumlu)
  if (favoriteEvents.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Ionicons name="heart-dislike-outline" size={80} color={colors.textSecondary} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Henüz Favorin Yok</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>Beğendiğin etkinlikleri kalp ikonuna tıklayarak buraya ekleyebilirsin.</Text>
        <TouchableOpacity style={[styles.exploreButton, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.exploreButtonText}>Etkinlik Keşfet</Text>
        </TouchableOpacity>
        
        {/* Alt barın boş ekranda da görünmesi için eklendi */}
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <CustomTabBar state={{ index: 1 }} navigation={navigation} />
        </View>
      </View>
    );
  }

  const renderFavoriteItem = ({ item }: any) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons name="heart" size={24} color="#ef4444" />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.date, { color: colors.primary }]}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* YENİ: Eksik olan "Favorilerim" başlığı eklendi */}
      <Text style={[styles.headerTitle, { color: colors.text }]}>Favorilerim</Text>
      
      <FlatList
        data={favoriteEvents}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <CustomTabBar state={{ index: 1 }} navigation={navigation} />
    </View>
  );
};

// TASARIM (CSS) - Sabit renkler silindi
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 }, // Biletlerim sayfasıyla aynı üst boşluk
  headerTitle: { fontSize: 28, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 5 }, // Yeni başlığımızın stili
  listContainer: { padding: 20, paddingBottom: 100 }, 
  card: { borderRadius: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, overflow: 'hidden' },
  image: { width: '100%', height: 150 },
  favoriteButton: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 20 },
  info: { padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  date: { fontSize: 14, fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  emptySubtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  exploreButton: { paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25 },
  exploreButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});

export default FavoritesScreen;