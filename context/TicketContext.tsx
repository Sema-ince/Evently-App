import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TicketContext = createContext<any>(null);

// İŞTE UNUTTUĞUMUZ O KAHRAMAN KANCA (HOOK) BURADA! 🦸‍♀️
export const useTickets = () => {
  return useContext(TicketContext);
};

export const TicketProvider = ({ children }: any) => {
  const [tickets, setTickets] = useState<any[]>([]);

  const loadUserTickets = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('@user_data');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        const userTicketKey = `@biletler_v2_${userData.email}`; 
        
        const storedTickets = await AsyncStorage.getItem(userTicketKey);
        if (storedTickets) {
          setTickets(JSON.parse(storedTickets));
        } else {
          setTickets([]); 
        }
      }
    } catch (error) {
      console.log('Biletler yüklenirken hata:', error);
    }
  };

  useEffect(() => {
    loadUserTickets();
  }, []);

  const buyTicket = async (event: any) => {
    try {
      const storedUserData = await AsyncStorage.getItem('@user_data');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        const userTicketKey = `@biletler_v2_${userData.email}`;

        const newTicket = { 
          ...event, 
          ticketId: Math.random().toString(36).substring(2, 11),
          purchaseDate: new Date().toISOString()
        };
        
        const updatedTickets = [newTicket, ...tickets];
        setTickets(updatedTickets); 
        
        await AsyncStorage.setItem(userTicketKey, JSON.stringify(updatedTickets));
      }
    } catch (error) {
      console.log('Bilet alınırken hata:', error);
    }
  };

  return (
    <TicketContext.Provider value={{ tickets, buyTicket, loadUserTickets }}>
      {children}
    </TicketContext.Provider>
  );
};