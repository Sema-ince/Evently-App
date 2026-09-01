export const categories = [
  { id: '1', name: 'Tümü' },
  { id: '2', name: 'Teknoloji' },
  { id: '3', name: 'Müzik' },
  { id: '4', name: 'Eğitim' },
  { id: '5', name: 'Sanat' },
  { id: '6', name: 'Yiyecek/İçecek' },
  { id: '7', name: 'Kariyer' },
  { id: '8', name: 'Spor' }
];

export const events = [
  // TEKNOLOJİ VE YAZILIM
  { id: '1', title: 'FÜBET Tanışma ve Vizyon Toplantısı', date: '10 Eylül 2026 - 14:00', location: 'Fırat Üniversitesi', price: 'Ücretsiz', category: 'Teknoloji', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', description: 'Bilişim Eğitim Topluluğu yeni dönem üyeleriyle buluşuyor. Projeler ve yol haritası konuşulacak.' },
  { id: '2', title: 'DevFest Elazığ 2026', date: '24 Ekim 2026 - 09:30', location: 'Bünyamin Eroğlu Kongre Merkezi', price: '100 TL', category: 'Teknoloji', image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6', description: 'Geliştirici teknolojileri, yazılım trendleri ve sektörden uzmanlarla networking fırsatı.' },
  { id: '3', title: 'Python ve OpenCV ile Görüntü İşleme', date: '15 Eylül 2026 - 13:00', location: 'Mühendislik Fakültesi', price: 'Ücretsiz', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb', description: 'Yapay zeka ve bilgisayarlı görü temelleri, OpenCV kütüphanesi uygulamalı anlatımı.' },
  { id: '4', title: 'Teknofest Sualtı Sistemleri Eğitimi', date: '5 Ekim 2026 - 15:00', location: 'Atatürk Stadyumu Genç Ofis', price: 'Ücretsiz', category: 'Teknoloji', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', description: 'Otonom sualtı araçları için algoritma geliştirme ve proje yazma eğitimi.' },
  { id: '5', title: 'C# ile Masaüstü Uygulama Geliştirme', date: '20 Eylül 2026 - 10:00', location: 'Bilgisayar Lab 1', price: '50 TL', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', description: 'Sıfırdan ileri seviyeye C# ve form uygulamaları geliştirme kampı.' },
  { id: '6', title: 'HSD Fırat Code & Game Night', date: '14 Kasım 2026 - 20:00', location: 'Fırat Üniversitesi', price: 'Ücretsiz', category: 'Teknoloji', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', description: 'Sabaha kadar sürecek kodlama ve oyun maratonu. Pizza ve kahve bizden!' },
  { id: '7', title: 'TUA Astro Hackathon', date: '1-3 Ekim 2026', location: 'Elazığ Teknokent', price: 'Ücretsiz', category: 'Teknoloji', image: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0', description: '48 saat sürecek kesintisiz uzay ve teknoloji hackathonu.' },
  { id: '8', title: 'YOLO ile Nesne Tespiti Bootcamp', date: '18 Eylül 2026 - 16:00', location: 'Online', price: '150 TL', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', description: 'Makine öğrenmesi modelleri ve YOLO framework ile gerçek zamanlı tespit uygulamaları.' },
  { id: '9', title: 'Java Spring Boot Eğitimi', date: '22 Eylül 2026 - 19:00', location: 'Online', price: '200 TL', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67', description: 'Kurumsal mimarilerde Java ve Spring Boot kullanımı.' },
  { id: '10', title: 'UniTour #2: Blockchain ve Ağlar', date: '30 Eylül 2026 - 13:00', location: 'Fırat Üniversitesi', price: 'Ücretsiz', category: 'Teknoloji', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0', description: 'Kampüs içi Web3, Blockchain ve merkeziyetsiz ağ teknolojileri buluşması.' },
  
  // KARİYER VE EĞİTİM
  { id: '11', title: 'Erasmus+ Polonya Bilgilendirme Semineri', date: '12 Eylül 2026 - 10:30', location: 'Rektörlük Kampüsü', price: 'Ücretsiz', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1', description: 'Erasmus sınavına hazırlık, partner üniversite seçimi ve başvuru süreci hakkında her şey.' },
  { id: '12', title: 'Anadolu Grubu Yazılım Stajyer Alımı', date: '25 Ekim 2026 - 14:00', location: 'Kariyer Merkezi', price: 'Ücretsiz', category: 'Kariyer', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d', description: 'Yazılım mühendisliği öğrencileri için yaz dönemi staj programı tanıtımı.' },
  { id: '13', title: 'Algoritma ve Yazılım Koçluğu', date: '5 Kasım 2026 - 17:00', location: 'Genç Ofis', price: 'Ücretsiz', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1513258496099-481620d4ce8d', description: 'Birebir kodlama mentörlüğü ve mülakat simülasyonları.' },
  { id: '14', title: 'Etkili LinkedIn Profili Oluşturma', date: '18 Ekim 2026 - 15:00', location: 'Online', price: 'Ücretsiz', category: 'Kariyer', image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c', description: 'Staj ve iş başvurularında öne çıkmanızı sağlayacak profil optimizasyonu.' },
  { id: '15', title: 'Akademik Makale Formatı ve IEEE', date: '2 Kasım 2026 - 11:00', location: 'Mühendislik Konferans Salonu', price: 'Ücretsiz', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32', description: 'Uluslararası sempozyumlar için makale yazım teknikleri.' },
  
  // YİYECEK/İÇECEK VE SOSYAL
  { id: '16', title: 'Elazığ Kahve ve Çikolata Festivali', date: '20 Kasım 2026 - 10:00', location: 'Ahmet Tevfik Ozan Fuar Merkezi', price: '120 TL', category: 'Yiyecek/İçecek', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf', description: 'Dünya kahveleri tadımı, çikolata atölyeleri ve barista şovları.' },
  { id: '17', title: 'Coca-Cola Üretim Tesisleri Gezisi', date: '8 Ekim 2026 - 09:00', location: 'Elazığ OSB', price: 'Ücretsiz', category: 'Kariyer', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97', description: 'Endüstriyel üretim bantlarının incelenmesi ve teknik saha gezisi.' },
  { id: '18', title: 'Sağlıklı Atıştırmalıklar Atölyesi', date: '28 Eylül 2026 - 14:00', location: 'Gastronomi Merkezi', price: '250 TL', category: 'Yiyecek/İçecek', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', description: 'Makro besin ve kalori hesabı yaparak pratik ve sağlıklı tarifler hazırlama.' },
  { id: '19', title: 'Geleneksel Sokak Lezzetleri Tadımı', date: '10 Ekim 2026 - 12:00', location: 'Şehir Meydanı', price: '150 TL', category: 'Yiyecek/İçecek', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', description: 'Mantı, lahmacun ve diğer yerel lezzetlerin gastronomi buluşması.' },
  
  // MÜZİK VE SANAT
  { id: '20', title: 'Açık Hava Rock Konseri', date: '16 Eylül 2026 - 21:00', location: 'Kampüs Festival Alanı', price: '300 TL', category: 'Müzik', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea', description: 'Bahar dönemine veda ederken devasa açık hava konseri.' },
  { id: '21', title: 'Akustik Dinleti ve Şiir Gecesi', date: '30 Ekim 2026 - 19:30', location: 'Kültür Merkezi', price: '80 TL', category: 'Müzik', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1', description: 'Sakin bir akşam geçirmek isteyenler için akustik gitar ve şiir performansları.' },
  { id: '22', title: 'Modern Sanat Sergisi', date: '7 Ekim 2026 - 10:00', location: 'Sanat Galerisi', price: 'Ücretsiz', category: 'Sanat', image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5', description: 'Yerel sanatçıların dijital ve fiziksel modern sanat eserleri.' },
  { id: '23', title: 'Tiyatro: Bir Yaz Gecesi Rüyası', date: '12 Kasım 2026 - 20:00', location: 'Devlet Tiyatrosu', price: '90 TL', category: 'Sanat', image: 'https://images.unsplash.com/photo-1507676184212-d0330a15183c', description: 'Shakespeare in klasik eserinin modern bir uyarlaması.' },
  { id: '24', title: 'Film Analizi: Interstellar', date: '3 Ekim 2026 - 17:00', location: 'Sinema Kulübü', price: 'Ücretsiz', category: 'Sanat', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1', description: 'Bilim kurgu başyapıtının sinematografik ve fiziksel analizi.' },
  { id: '25', title: 'DJ Performansı ve Parti', date: '23 Ekim 2026 - 22:00', location: 'Gece Kulübü', price: '400 TL', category: 'Müzik', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', description: 'Yerel ve ulusal DJ lerin katılımıyla elektronik müzik gecesi.' },
  
  // SPOR VE AKTİVİTE
  { id: '26', title: 'Sonbahar Doğa Yürüyüşü', date: '19 Eylül 2026 - 08:00', location: 'Harput Kalesi ve Çevresi', price: 'Ücretsiz', category: 'Spor', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306', description: 'Rehber eşliğinde tarihi ve doğal güzellikleri keşfetme turu.' },
  { id: '27', title: 'Üniversiteler Arası Espor Turnuvası', date: '11 Ekim 2026 - 13:00', location: 'Espor Arena', price: '50 TL', category: 'Spor', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e', description: 'Valorant ve League of Legends takımlarının kıyasıya mücadelesi.' },
  { id: '28', title: 'Sabah Yogası Kampı', date: '26 Eylül 2026 - 07:00', location: 'Kampüs Çim Alan', price: 'Ücretsiz', category: 'Spor', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', description: 'Güne zinde başlamak için açık havada temel yoga hareketleri.' },
  { id: '29', title: '3x3 Sokak Basketbolu Turnuvası', date: '17 Ekim 2026 - 16:00', location: 'Açık Spor Tesisleri', price: 'Ücretsiz', category: 'Spor', image: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9', description: 'Takımını kur ve sokak basketbolu heyecanına ortak ol.' },
  { id: '30', title: 'Maraton Koşusu Eğitim Semineri', date: '21 Ekim 2026 - 18:00', location: 'Spor Bilimleri Fakültesi', price: 'Ücretsiz', category: 'Spor', image: 'https://images.unsplash.com/photo-1552674605-15c37eee7299', description: 'Uzun mesafe koşuları için dayanıklılık ve beslenme taktikleri.' },

  // DİĞER KARIŞIK
  { id: '31', title: 'Girişimcilik Zirvesi', date: '27 Kasım 2026 - 10:00', location: 'Kongre Merkezi', price: '150 TL', category: 'Kariyer', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7', description: 'Kendi startup ını kurmak isteyenler için yatırımcı buluşmaları.' },
  { id: '32', title: 'Robotik Kodlama Atölyesi (Çocuklar İçin)', date: '9 Ekim 2026 - 14:00', location: 'Halk Eğitim Merkezi', price: 'Ücretsiz', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e', description: 'Çocuklara yönelik ebeveyn kontrollü temel robotik eğitimi.' },
  { id: '33', title: 'Kışa Merhaba Kampı', date: '5 Aralık 2026 - 12:00', location: 'Hazar Gölü Çevresi', price: '300 TL', category: 'Eğlence', image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed', description: 'Çadır, kamp ateşi ve müzik eşliğinde kış sezonu açılışı.' },
  { id: '34', title: 'İleri Düzey İngilizce Konuşma Kulübü', date: '14 Eylül 2026 - 17:30', location: 'Kütüphane Çalışma Salonu', price: 'Ücretsiz', category: 'Eğitim', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8', description: 'A2 seviyesinden yukarı çıkmak ve pratik yapmak isteyenler için conversation club.' },
  { id: '35', title: 'Masa Tenisi Turnuvası', date: '28 Ekim 2026 - 15:00', location: 'Kapalı Spor Salonu', price: '20 TL', category: 'Spor', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827', description: 'Fakülteler arası ödüllü masa tenisi şampiyonası.' }
];