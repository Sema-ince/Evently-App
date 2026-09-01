import axios from 'axios';
import { Alert } from 'react-native';

// Senin MockAPI projene ait özel adres
const BASE_URL = 'https://6a913d7c7751d35ce47e5206.mockapi.io';

// Axios için merkezi bir kapsayıcı (wrapper) oluşturuyoruz
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 saniye içinde cevap gelmezse iptal et
});

// Sunucudan gelen cevapları araya girip dinleyen merkez
api.interceptors.response.use(
  (response) => {
    // İşlem başarılıysa veriyi geldiği gibi sayfalara gönder
    return response;
  },
  (error) => {
    // Hata durumlarının (network hatası, 401, 500) ele alınması
    if (!error.response) {
      Alert.alert("Bağlantı Hatası", "Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
    } else if (error.response.status === 401) {
      Alert.alert("Oturum Zaman Aşımı", "Lütfen güvenliğiniz için tekrar giriş yapın.");
    } else if (error.response.status === 500) {
      Alert.alert("Sunucu Hatası", "Şu an işleminizi gerçekleştiremiyoruz. Lütfen daha sonra tekrar deneyin.");
    } else {
      Alert.alert("Bir Hata Oluştu", "İşleminiz şu anda yapılamıyor.");
    }
    
    return Promise.reject(error);
  }
);

export default api;