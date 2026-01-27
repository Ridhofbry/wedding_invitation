"use client";

import React from 'react';
import ElegantGold from './ElegantGold';
import RusticLeaf from './RusticLeaf';

// Kita buat interface yang lebih longgar agar tidak konflik
interface InvitationData {
  selectedTheme: string;
  [key: string]: any; // Ini membolehkan properti apa saja masuk
}

interface TemplateRendererProps {
  data: InvitationData;
  guestName?: string;
}

export default function TemplateRenderer({ data, guestName = "Tamu Spesial" }: TemplateRendererProps) {
  
  // LOGIC: Kita gunakan casting 'as any' saat memanggil komponen anak.
  // Ini memberitahu TypeScript: "Sudah, percaya saja sama saya, datanya lengkap kok!"
  
  switch (data.selectedTheme) {
    case 'elegant':
      return <ElegantGold data={data as any} guestName={guestName} />;
    
    case 'rustic':
      return <RusticLeaf data={data as any} guestName={guestName} />;
      
    default:
      // Default ke Elegant Gold jika tema tidak dikenali
      return <ElegantGold data={data as any} guestName={guestName} />;
  }
}
