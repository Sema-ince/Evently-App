import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTickets } from '../context/TicketContext';
import { ThemeContext } from '../context/ThemeContext'; // YENİ: Tema merkezi eklendi
import CustomTabBar from '../components/CustomTabBar';

// Türkçe tarihi JavaScript Date objesine çeviren yardımcı fonksiyon
const parseEventDate = (dateString: string) => {
  if (!dateString) return new Date(); // Veri yoksa çökmesini engelle

  const months: { [key: string]: number } = {
    'Ocak': 0, 'Şubat': 1, 'Mart': 2, 'Nisan': 3, 'Mayıs': 4, 'Haziran': 5,
    'Temmuz': 6, 'Ağustos': 7, 'Eylül': 8, 'Ekim': 9, 'Kasım': 10, 'Aralık': 11
  };
  
  try {
    const datePart = dateString.split(' - ')[0]; 
    const parts = datePart.split(' '); 
    
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]]; 
    const year = parseInt(parts[2], 10);
    
    return new Date(year, month, day);
  } catch (error) {
    return new Date(); 
  }
};

const TicketsScreen = ({ navigation }: any) => {
  const { tickets } = useTickets();
  const [activeTab, setActiveTab] = useState('active');
  
  // YENİ: Temadan renkleri çekiyoruz
  const { colors } = useContext(ThemeContext);

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  
  const activeTickets = tickets.filter((ticket: any) => {
    if (!ticket || !ticket.date) return false;
    const eventDate = parseEventDate(ticket.date);
    return eventDate >= today; 
  });

  const pastTickets = tickets.filter((ticket: any) => {
    if (!ticket || !ticket.date) return false;
    const eventDate = parseEventDate(ticket.date);
    return eventDate < today; 
  });

  const displayTickets = activeTab === 'active' ? activeTickets : pastTickets;

  const renderTicket = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.ticketCard, { backgroundColor: colors.card }]} // Dinamik kart arka planı
      onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
    >
      <Image source={{ uri: item?.image }} style={styles.ticketImage} />
      <View style={styles.ticketInfo}>
        <Text style={[styles.ticketTitle, { color: colors.text }]}>{item?.title}</Text>
        <Text style={[styles.ticketDate, { color: colors.primary }]}>📅 {item?.date}</Text>
        <Text style={[styles.ticketId, { color: colors.textSecondary }]}>🎫 Bilet No: {item?.ticketId || item?.id}</Text>
        <Text style={[styles.purchaseDate, { color: colors.textSecondary }]}>
          Satın Alınma: {item?.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'Bilinmiyor'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Biletlerim</Text>

      <View style={[styles.tabContainer, { backgroundColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'active' && [styles.activeTabButton, { backgroundColor: colors.card }]]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === 'active' && { color: colors.primary }]}>Aktif Biletler</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'past' && [styles.activeTabButton, { backgroundColor: colors.card }]]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === 'past' && { color: colors.primary }]}>Geçmiş Biletler</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayTickets}
        renderItem={renderTicket}
        keyExtractor={(item, index) => item?.ticketId || index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Bu kategoride biletiniz bulunmamaktadır.
          </Text>
        }
      />

      <CustomTabBar state={{ index: 2 }} navigation={navigation} />
    </View>
  );
};

// Sabit renkler (ör. #ffffff, #1f2937) kaldırıldı, hepsi inline dinamik oldu
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 15 },
  tabContainer: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 15, borderRadius: 10, padding: 5 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTabButton: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  tabText: { fontSize: 16, fontWeight: '600' },
  ticketCard: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 15, borderRadius: 12, padding: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  ticketImage: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  ticketInfo: { flex: 1, justifyContent: 'center' },
  ticketTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  ticketDate: { fontSize: 14, marginBottom: 3 },
  ticketId: { fontSize: 14, fontWeight: 'bold' },
  purchaseDate: { fontSize: 12, marginTop: 5 },
  emptyText: { textAlign: 'center', fontSize: 16, marginTop: 50 },
});

export default TicketsScreen;