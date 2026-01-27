"use client";

import React, { createContext, useContext, useState } from 'react';

// --- Default Data ---
const defaultInvitationData = {
  selectedTheme: 'elegant', 
  guestName: 'Nama Tamu',
  audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_d14e9a9302.mp3?filename=wedding-piano-12662.mp3',
  images: {
    cover: null as string | null,     
    gallery1: null as string | null,  
    gallery2: null as string | null,  
  },
  couple: {
    groom: { firstName: 'Adam', fullName: 'Adam Wijaya, S.Kom', parents: 'Bpk. Budi & Ibu Siti' },
    bride: { firstName: 'Hawa', fullName: 'Siti Hawa, S.Ak', parents: 'Bpk. Rahmat & Ibu Nur' }
  },
  event: {
    date: '2025-12-12',
    timeStart: '08:00',
    timeEnd: '13:00',
    locationName: 'The Royal Glasshouse',
    address: 'Jl. Gatot Subroto No. 10, Jakarta Selatan'
  },
  content: {
    greeting: 'Dengan memohon Rahmat & Ridho Allah SWT',
    quote: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...',
    quoteSource: 'QS. Ar-Rum: 21'
  }
};

// --- Context Definition ---
const InvitationContext = createContext<any>(null);

export const InvitationProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState(defaultInvitationData);

  // Actions
  const setSelectedTheme = (themeName: string) => setData(prev => ({ ...prev, selectedTheme: themeName }));
  
  const updateGuest = (name: string) => setData(prev => ({ ...prev, guestName: name }));

  const updateCouple = (partner: 'groom' | 'bride', field: string, value: string) => {
    setData(prev => ({
      ...prev,
      couple: { ...prev.couple, [partner]: { ...prev.couple[partner], [field]: value } }
    }));
  };

  const updateEvent = (field: string, value: string) => {
    setData(prev => ({ ...prev, event: { ...prev.event, [field]: value } }));
  };

  const updateImage = (field: string, file: File) => {
    if (file) {
      // Create local preview URL
      const objectUrl = URL.createObjectURL(file);
      setData(prev => ({ 
        ...prev, 
        images: { ...prev.images, [field]: objectUrl } 
      }));
    }
  };

  const removeImage = (field: string) => {
    setData(prev => ({ 
      ...prev, 
      images: { ...prev.images, [field]: null } 
    }));
  };

  return (
    <InvitationContext.Provider value={{ 
      data, 
      setData, 
      setSelectedTheme, 
      updateGuest, 
      updateCouple, 
      updateEvent, 
      updateImage, 
      removeImage 
    }}>
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitationStore = () => useContext(InvitationContext);
