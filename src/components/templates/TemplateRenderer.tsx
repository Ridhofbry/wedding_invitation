"use client";

import React from 'react';
import ElegantGold from './ElegantGold';
import RusticLeaf from './RusticLeaf';

// Pastikan tipe data ini konsisten di seluruh aplikasi Anda
interface InvitationData {
  selectedTheme: string;
  // ... properti lain (bisa menggunakan Partial<T> atau type lengkap)
  [key: string]: any; 
}

interface TemplateRendererProps {
  data: InvitationData;
  guestName?: string;
}

export default function TemplateRenderer({ data, guestName = "Tamu Spesial" }: TemplateRendererProps) {
  // Logic pemilihan tema sederhana
  // Jika tema tidak ditemukan, default ke ElegantGold
  
  switch (data.selectedTheme) {
    case 'elegant':
      return <ElegantGold data={data} guestName={guestName} />;
    
    case 'rustic':
      return <RusticLeaf data={data} guestName={guestName} />;
      
    // Tambahkan case untuk tema baru di sini (misal: 'modern', 'floral')
    
    default:
      return <ElegantGold data={data} guestName={guestName} />;
  }
}
