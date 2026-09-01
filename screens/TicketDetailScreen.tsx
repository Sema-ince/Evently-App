import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ThemeContext } from '../context/ThemeContext'; // 1. ThemeContext'i içeri aktardık

const TicketDetailScreen = ({ route, navigation }: any) => {
  const { ticket } = route.params;
  
  // 2. Tema renklerini ve karanlık mod durumunu çektik
  const { colors, isDarkMode } = useContext(ThemeContext);

  if (!ticket) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Üst Header Alanı */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: colors.primary }]}>{"< Geri"}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Bilet Detayı</Text>
      </View>

      {/* Bilet Kartı */}
      <View style={[styles.ticketContainer, { backgroundColor: colors.card }]}>
        <Image source={{ uri: ticket?.image }} style={styles.image} />
        
        <Text style={[styles.title, { color: colors.text }]}>{ticket?.title}</Text>
        
        <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Tarih:</Text>
          <Text style={[styles.value, { color: colors.text }]}>{ticket?.date}</Text>
        </View>

        <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Mekan:</Text>
          <Text style={[styles.value, { color: colors.text }]}>{ticket?.location}</Text>
        </View>

        <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Bilet No:</Text>
          <Text style={[styles.value, { color: colors.text }]}>{ticket?.ticketId || ticket?.id}</Text>
        </View>

        <View style={styles.qrContainer}>
          <Text style={[styles.qrText, { color: colors.textSecondary }]}>Girişte bu kodu okutunuz</Text>
          {/* Karanlık modda QR kod arkası siyah kalmasın diye beyaz bir kutu içine aldık */}
          <View style={styles.qrWrapper}>
            <QRCode
              value={ticket?.ticketId ? `bilet-${ticket.ticketId}` : 'gecersiz-bilet'}
              size={150}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50 },
  backButton: { fontSize: 16, fontWeight: 'bold', marginRight: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  ticketContainer: { margin: 20, borderRadius: 15, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  image: { width: '100%', height: 150, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, borderBottomWidth: 1, paddingBottom: 5 },
  label: { fontSize: 16 },
  value: { fontSize: 16, fontWeight: 'bold' },
  qrContainer: { alignItems: 'center', marginTop: 30 },
  qrText: { fontSize: 14, marginBottom: 15 },
  qrWrapper: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10 } // QR kodun okunabilmesi için beyaz arka plan kutusu
});

export default TicketDetailScreen;