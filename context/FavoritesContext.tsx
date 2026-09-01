import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Her sayfanın erişebileceği ortak Context'i (Hafızayı) oluşturuyoruz
export const FavoritesContext = createContext<any>(null);

// 2. Bu hafızayı yönetecek olan Sağlayıcı (Provider) bileşenimiz
export const FavoritesProvider = ({ children }: any) => {
  // Sadece favoriye eklenen etkinliklerin ID'lerini tutacağız: Örn: ['1', '3']
  const [favorites, setFavorites] = useState<string[]>([]);

  // Uygulama ilk açıldığında fiziksel hafızadan (AsyncStorage) favorileri çek
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavs = await AsyncStorage.getItem('userFavorites');
        if (savedFavs) {
          setFavorites(JSON.parse(savedFavs)); // Metni tekrar diziye çeviriyoruz
        }
      } catch (error) {
        console.log("Favoriler yüklenirken hata oluştu", error);
      }
    };
    loadFavorites();
  }, []);

  // Kalp butonuna basıldığında çalışacak sihirli fonksiyon
  const toggleFavorite = async (eventId: string) => {
    let updatedFavs = [];
    
    // Eğer etkinlik zaten favorilerdeyse, listeden çıkar
    if (favorites.includes(eventId)) {
      updatedFavs = favorites.filter(id => id !== eventId);
    } else {
      // Yoksa listeye ekle
      updatedFavs = [...favorites, eventId];
    }
    
    setFavorites(updatedFavs); // Uygulama ekranlarını anında güncelle
    await AsyncStorage.setItem('userFavorites', JSON.stringify(updatedFavs)); // Telefon hafızasına kalıcı kaydet
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};