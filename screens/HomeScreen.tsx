import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../data/dummyData'; 
import api from '../services/api'; 
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../context/FavoritesContext';
import { ThemeContext } from '../context/ThemeContext'; 
import CustomTabBar from '../components/CustomTabBar';

// Akıllı Görsel Bileşeni (Aynen korundu)
const FallbackImage = ({ uri, category, style }: { uri: string, category?: string, style: any }) => {
  const [hasError, setHasError] = useState(false);
  const fallbackImages: { [key: string]: string } = {
    'Teknoloji': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    'Eğitim': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    'Spor': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    'Müzik': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    'Sanat': 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
    'Kariyer': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
  };
  const defaultImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80';
  const finalImage = (category && fallbackImages[category]) ? fallbackImages[category] : defaultImage;

  return (
    <Image 
      source={{ uri: hasError || !uri ? finalImage : uri }} 
      style={style} 
      onError={() => setHasError(true)} 
    />
  );
};

const HomeScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { colors, isDarkMode, toggleTheme } = useContext(ThemeContext); 

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Sema'); // İsmine özel selamlama

  useEffect(() => {
    fetchEvents();
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const stored = await AsyncStorage.getItem('@user_data');
      if (stored) {
        const userData = JSON.parse(stored);
        if (userData.name) setUserName(userData.name);
      }
    } catch (error) {
      console.log("İsim çekilemedi", error);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.log("Veriler çekilirken hata oluştu", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event: any) => {
    const matchesCategory = selectedCategory === 'Tümü' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Diziyi bölüyoruz
  const featuredEvents = filteredEvents.slice(0, 3);
  const popularEvents = filteredEvents.slice(3, 6);
  const upcomingEvents = filteredEvents.slice(6);

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.categoryButton, { backgroundColor: selectedCategory === item.name ? colors.primary : colors.card, borderColor: colors.border, borderWidth: 1 }]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text style={[styles.categoryText, { color: selectedCategory === item.name ? '#ffffff' : colors.text }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Favori butonunu tekrar tekrar yazmamak için küçük bir yardımcı
  const renderFavoriteButton = (id: any) => {
    const isFav = favorites.includes(id);
    return (
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(id)}>
        <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? "#ef4444" : "#ffffff"} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* ÜST BÖLÜM: Selamlama ve Tema Butonu */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greetingText, { color: colors.textSecondary }]}>Hoş geldin,</Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{userName} 👋</Text>
        </View>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={26} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* ARAMA */}
      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        placeholder="Etkinlik, mekan ara..."
        placeholderTextColor={colors.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* KATEGORİLER */}
      <View style={styles.categoriesContainer}>
        <FlatList data={categories} renderItem={renderCategory} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Sunucudan veriler alınıyor...</Text>
        </View>
      ) : filteredEvents.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Aradığınız kriterlere uygun etkinlik bulunamadı.</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          
          {/* ÖNE ÇIKANLAR (Carousel) */}
          {featuredEvents.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Öne Çıkanlar</Text>
              <FlatList 
                horizontal 
                showsHorizontalScrollIndicator={false}
                data={featuredEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={[styles.featuredCard, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]} onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
                    <FallbackImage uri={item.image} category={item.category} style={styles.featuredImage} />
                    {renderFavoriteButton(item.id)}
                    <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                    <Text style={[styles.cardDate, { color: colors.primary }]}>{item.date}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {/* YAKLAŞAN ETKİNLİKLER (Dikey Liste) */}
          {upcomingEvents.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Yaklaşan Etkinlikler</Text>
              {upcomingEvents.map((item) => (
                <TouchableOpacity key={item.id} style={[styles.upcomingCard, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]} onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
                  <FallbackImage uri={item.image} category={item.category} style={styles.upcomingImage} />
                  <View style={styles.upcomingInfo}>
                    <Text style={[styles.upcomingTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
                    <Text style={[styles.cardDate, { color: colors.primary, paddingHorizontal: 0, marginTop: 4 }]}>{item.date}</Text>
                    <Text style={[styles.cardLocation, { color: colors.textSecondary }]}>📍 {item.location}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

        </ScrollView>
      )}

      {/* BOT BUTONU */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Chatbot')}>
        <Ionicons name="chatbubbles" size={28} color="#ffffff" />
      </TouchableOpacity>
      
      {/* ALT MENÜ */}
      <CustomTabBar state={{ index: 0 }} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 20 },
  greetingText: { fontSize: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', marginTop: 4 },
  themeToggle: { padding: 5 },
  searchInput: { padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 20, borderWidth: 1, marginHorizontal: 20 },
  categoriesContainer: { marginBottom: 20, paddingLeft: 20 },
  categoryButton: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  categoryText: { fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, marginTop: 10, marginBottom: 15 },
  
  // Öne Çıkanlar Kartları
  featuredCard: { width: 260, borderRadius: 16, marginLeft: 20, marginRight: 5, marginBottom: 20, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  featuredImage: { width: '100%', height: 140 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', padding: 12, paddingBottom: 4 },
  cardDate: { fontSize: 13, fontWeight: '600', paddingHorizontal: 12, paddingBottom: 15 },
  
  // Yaklaşan Etkinlikler Kartları
  upcomingCard: { flexDirection: 'row', borderRadius: 16, marginHorizontal: 20, marginBottom: 15, overflow: 'hidden', elevation: 2, padding: 10 },
  upcomingImage: { width: 90, height: 90, borderRadius: 12 },
  upcomingInfo: { flex: 1, paddingLeft: 15, justifyContent: 'center' },
  upcomingTitle: { fontSize: 16, fontWeight: 'bold' },
  cardLocation: { fontSize: 12, marginTop: 4 },
  
  favoriteButton: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.4)', padding: 6, borderRadius: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  loadingText: { marginTop: 10, fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, paddingHorizontal: 20 },
  fab: { position: 'absolute', bottom: 90, right: 20, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 }
});

export default HomeScreen;