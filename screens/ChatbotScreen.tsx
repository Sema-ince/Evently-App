import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { events } from '../data/dummyData'; // Etkinliklerimizi filtrelemek için veriyi çağırıyoruz

// Mesaj yapımızın şablonu
interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const ChatbotScreen = ({ navigation }: any) => {
  const { colors } = useContext(ThemeContext);
  const [inputText, setInputText] = useState('');
  
  // Asistanın ilk açılış mesajı
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Merhaba! Ben akıllı etkinlik asistanın. Sana ücretsiz veya belirli bir kategorideki etkinlikleri bulmamı ister misin?', isBot: true }
  ]);
  
  const flatListRef = useRef<FlatList>(null);

  // NLP (Doğal Dil İşleme) Simülasyonu: Mesajı analiz edip cevap üreten fonksiyon
  // NLP (Doğal Dil İşleme) Simülasyonu: Mesajı analiz edip cevap üreten fonksiyon
  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Varsayılan cevap (Hiçbir koşul sağlanmazsa)
    let botReply = "Üzgünüm, tam anlayamadım. 'Kampüste neler var?', 'Bana rastgele etkinlik öner', 'Yapay zeka eğitimleri' veya 'Ücretsiz etkinlikler' gibi şeyler sorabilirsin.";

    // 1. Kural: Selamlaşma
    if (lowerMessage.includes('selam') || lowerMessage.includes('merhaba') || lowerMessage.includes('naber')) {
      botReply = "Selam! Etkinlik arayışında sana nasıl yardımcı olabilirim? İstersen 'bana rastgele etkinlik öner' diyerek şansını deneyebilirsin!";
    }
    // 2. Kural: Ücretsiz / Bedava etkinlikler
    else if (lowerMessage.includes('ücretsiz') || lowerMessage.includes('bedava') || lowerMessage.includes('parasız')) {
      const freeEvents = events.filter(e => e.price.toLowerCase() === 'ücretsiz');
      if (freeEvents.length > 0) {
        botReply = `Cüzdan dostu seçim! Senin için tam ${freeEvents.length} tane ücretsiz etkinlik buldum. İlk gözüme çarpan: "${freeEvents[0].title}".`;
      }
    }
    // 3. Kural: Kampüs ve Lokasyon Odaklı Arama
    else if (lowerMessage.includes('kampüs') || lowerMessage.includes('fırat') || lowerMessage.includes('üniversite')) {
      const campusEvents = events.filter(e => e.location.toLowerCase().includes('fırat') || e.location.toLowerCase().includes('kampüs') || e.location.toLowerCase().includes('mühendislik'));
      if (campusEvents.length > 0) {
        botReply = `Kampüs çevresinde ${campusEvents.length} etkinlik var. Özellikle "${campusEvents[0].title}" ilgini çekebilir. Öğrenci işi en iyisi!`;
      } else {
        botReply = "Şu an kampüs içerisinde yaklaşan bir etkinlik görünmüyor.";
      }
    }
    // 4. Kural: Derinlemesine Yazılım, Kodlama ve Yapay Zeka
    else if (lowerMessage.includes('teknoloji') || lowerMessage.includes('yazılım') || lowerMessage.includes('yapay zeka') || lowerMessage.includes('kodlama') || lowerMessage.includes('hackathon')) {
      const techEvents = events.filter(e => e.category === 'Teknoloji' || e.category === 'Eğitim');
      // Yazılımcılara özel kelimeleri barındıranları (Python, C#, OpenCV, YOLO) filtrele
      const hardcoreTech = techEvents.filter(e => e.title.toLowerCase().includes('python') || e.title.toLowerCase().includes('c#') || e.title.toLowerCase().includes('opencv') || e.title.toLowerCase().includes('yolo') || e.title.toLowerCase().includes('hackathon'));
      
      if (hardcoreTech.length > 0) {
        botReply = `Tam bir mühendis sorusu! Özellikle "${hardcoreTech[0].title}" tam sana göre olabilir. Toplam ${techEvents.length} teknoloji etkinliği buldum.`;
      } else {
        botReply = `Teknoloji dünyasından ${techEvents.length} etkinlik var. En yakını: ${techEvents[0].title}.`;
      }
    }
    // 5. Kural: Sağlık, Kalori ve Gastronomi
    else if (lowerMessage.includes('yemek') || lowerMessage.includes('sağlıklı') || lowerMessage.includes('kalori') || lowerMessage.includes('kahve') || lowerMessage.includes('tatlı')) {
      const foodEvents = events.filter(e => e.category === 'Yiyecek/İçecek');
      botReply = `Gastronomi zamanı! Atıştırmalık atölyelerinden kahve festivallerine kadar ${foodEvents.length} lezzetli etkinlik buldum. Öne çıkan: "${foodEvents[0].title}".`;
    }
    // 6. Kural: Rastgele (Sürpriz) Etkinlik Önerisi
    else if (lowerMessage.includes('rastgele') || lowerMessage.includes('öner') || lowerMessage.includes('sıkıldım') || lowerMessage.includes('ne yapsam')) {
      const randomIndex = Math.floor(Math.random() * events.length);
      const randomEvent = events[randomIndex];
      botReply = `Şuna ne dersin: "${randomEvent.title}". \n\nLokasyon: ${randomEvent.location}\nTarih: ${randomEvent.date}\n\nBence buna kesinlikle bir şans vermelisin!`;
    }
    // 7. Kural: Müzik ve Eğlence
    else if (lowerMessage.includes('müzik') || lowerMessage.includes('konser') || lowerMessage.includes('eğlence')) {
      const musicEvents = events.filter(e => e.category === 'Müzik');
      botReply = `Müzik ruhun gıdasıdır! Yaklaşan ${musicEvents.length} konser/dinleti var. Tavsiyem: "${musicEvents[0].title}".`;
    }

    return botReply;
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
    };

    // Kullanıcının mesajını ekrana bas
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Botun düşünme süresi (1 saniyelik gerçekçilik gecikmesi)
    setTimeout(() => {
      const replyText = generateBotResponse(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        isBot: true,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Sohbet baloncuğu tasarımı
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble, 
      item.isBot ? [styles.botBubble, { backgroundColor: colors.card }] : [styles.userBubble, { backgroundColor: colors.primary }]
    ]}>
      <Text style={[styles.messageText, { color: item.isBot ? colors.text : '#ffffff' }]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      // DEĞİŞEN KISIM BURASI: Android için 'undefined' yerine 'height' veya 'padding' veriyoruz
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
      // Üstteki "Akıllı Asistan" başlığının (header) yüksekliği kadar yukarı itme payı bırakıyoruz
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80} 
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      <View style={[styles.inputContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.background, borderColor: colors.border }]}
          placeholder="Asistana bir şey sor..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.primary }]} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Tasarım kodları (Dinamik renklere uyumlu)
const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { padding: 15, paddingBottom: 20 },
  messageBubble: { maxWidth: '80%', padding: 15, borderRadius: 20, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  botBubble: { alignSelf: 'flex-start', borderBottomLeftRadius: 5 },
  userBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 5 },
  messageText: { fontSize: 15, lineHeight: 22 },
  
  // İŞTE DÜZELTTİĞİMİZ YER BURASI:
  inputContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 10, 
    paddingTop: 10, 
    // İşletim sistemine göre (iOS veya Android) alt tuşlardan kurtaran sihirli boşluk:
    paddingBottom: Platform.OS === 'ios' ? 35 : 25, 
    borderTopWidth: 1, 
    alignItems: 'center' 
  },
  
  input: { flex: 1, borderWidth: 1, borderRadius: 25, paddingHorizontal: 20, paddingVertical: 12, fontSize: 16, marginRight: 10 },
  sendButton: { width: 45, height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 4 },
});

export default ChatbotScreen;