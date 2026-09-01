import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({ children }: any) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // 1. Önce giriş yapan kullanıcının e-postasını bulalım ve ona ait favorileri yükleyelim
  useEffect(() => {
    const loadUserAndFavorites = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('@user_data');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          if (userData && userData.email) {
            setUserEmail(userData.email);
            
            // O kullanıcıya özel favori anahtarı (Örn: userFavorites_sema@gmail.com)
            const savedFavs = await AsyncStorage.getItem(`userFavorites_${userData.email}`);
            if (savedFavs) {
              setFavorites(JSON.parse(savedFavs));
            } else {
              setFavorites([]); // Başka kullanıcının verisi kalmasın diye sıfırla
            }
          }
        }
      } catch (error) {
        console.log("Favoriler yüklenirken hata oluştu", error);
      }
    };

    loadUserAndFavorites();
  }, []);

  // 2. Kalp butonuna basıldığında aktif kullanıcının e-postasına göre kaydet
  const toggleFavorite = async (eventId: string) => {
    if (!userEmail) return; // Kullanıcı giriş yapmamışsa işlem yapma

    let updatedFavs = [];
    
    if (favorites.includes(eventId)) {
      updatedFavs = favorites.filter(id => id !== eventId);
    } else {
      updatedFavs = [...favorites, eventId];
    }
    
    setFavorites(updatedFavs);
    
    // Her kullanıcının kendi key'ine özel olarak kaydet
    await AsyncStorage.setItem(`userFavorites_${userEmail}`, JSON.stringify(updatedFavs));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};