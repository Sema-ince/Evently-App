import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import { ThemeContext } from '../context/ThemeContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { useTickets } from '../context/TicketContext'; // 1. TicketContext'i içeri aktardık

// YENİ: Kategoriye göre görsel seçen akıllı bileşen
const FallbackImage = ({ uri, category, style }: { uri: string, category?: string, style: any }) => {
  const [hasError, setHasError] = useState(false);

  // Kategorilere özel şık yedek görseller
  const fallbackImages: { [key: string]: string } = {
    'Teknoloji': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    'Eğitim': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    'Spor': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    'Müzik': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    'Sanat': 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
    'Kariyer': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
  };

  // Eğer kategori eşleşmezse, gece moduna çok uygun modern bir nötr görsel (Uzay/Ağ teması)
  const defaultImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80';
  
  // Hangi resmin gösterileceğine karar ver
  const finalImage = (category && fallbackImages[category]) ? fallbackImages[category] : defaultImage;

  return (
    <Image 
      source={{ uri: hasError || !uri ? finalImage : uri }} 
      style={style} 
      onError={() => setHasError(true)} 
    />
  );
};

const EventDetailScreen = ({ route, navigation }: any) => {
  const { eventId } = route.params;
  
  const { colors } = useContext(ThemeContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { buyTicket } = useTickets(); // 2. buyTicket fonksiyonunu çektik

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.log("Detaylar çekilirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Etkinlik yükleniyor...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, fontSize: 18 }}>Etkinlik bulunamadı!</Text>
      </View>
    );
  }

  const isFavorite = favorites.includes(event.id);

  // 3. Butona basıldığında doğrudan Context'teki buyTicket fonksiyonunu çalıştırıyoruz
  const handleActionPress = async () => {
    const isFree = event.price.toLowerCase() === 'ücretsiz';
    
    await buyTicket(event); // Biletleri yöneten merkezi yapıya kaydı gönderdik

    if (isFree) {
      alert("Kayıt Başarılı! \nEtkinliğe kaydınız 'Biletlerim' sekmesine eklenmiştir.");
    } else {
      alert("Satın Alma Başarılı! \nBiletiniz 'Biletlerim' sekmesine tanımlandı.");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <FallbackImage uri={event.image} category={event.category} style={styles.image} />
      
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(event.id)}>
        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={32} color={isFavorite ? "#ef4444" : "#ffffff"} />
      </TouchableOpacity>

      <View style={[styles.content, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={22} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>{event.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={22} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>{event.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={22} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.primary, fontWeight: 'bold' }]}>{event.price}</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Hakkında</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{event.description}</Text>
        
        <TouchableOpacity 
          style={[styles.buyButton, { backgroundColor: colors.primary }]}
          onPress={handleActionPress}
        >
          <Text style={styles.buyButtonText}>
            {event.price.toLowerCase() === 'ücretsiz' ? 'Kayıt Ol' : 'Bilet Al'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 300 },
  favoriteButton: { position: 'absolute', top: 40, right: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 30 },
  content: { flex: 1, padding: 25, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: -35 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  infoContainer: { marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  infoText: { fontSize: 16, marginLeft: 15 },
  divider: { height: 1, marginVertical: 25 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  description: { fontSize: 16, lineHeight: 26, marginBottom: 40 },
  buyButton: { paddingVertical: 18, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  buyButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});

export default EventDetailScreen;