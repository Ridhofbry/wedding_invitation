"use client";

import React from 'react';
import ElegantGold from './ElegantGold';
import RusticLeaf from './RusticLeaf';
import ModernClean from './ModernClean';
import TraditionalJavanese from './TraditionalJavanese';

// Definisi Tipe Data Lengkap (Sesuai dengan kebutuhan semua template)
export interface InvitationData {
  selectedTheme: string;
  audioUrl?: string;
  guestName?: string;
  images: {
    cover: string | null;
    gallery1: string | null;
    gallery2: string | null;
  };
  couple: {
    groom: { firstName: string; fullName: string; parents: string };
    bride: { firstName: string; fullName: string; parents: string };
  };
  event: {
    date: string;
    timeStart: string;
    timeEnd: string;
    locationName: string;
    address: string;
  };
  content: {
    greeting: string;
    quote: string;
    quoteSource: string;
  };
  // Index signature untuk properti tambahan tak terduga
  [key: string]: any; 
}

interface TemplateRendererProps {
  data: InvitationData;
  guestName?: string;
}

export default function TemplateRenderer({ data, guestName = "Tamu Spesial" }: TemplateRendererProps) {
  // Pastikan data memiliki struktur dasar untuk menghindari crash jika data parsial
  const safeData = data || {};

  switch (safeData.selectedTheme) {
    case 'elegant':
      return <ElegantGold data={data} guestName={guestName} />;
    
    case 'rustic':
      return <RusticLeaf data={data} guestName={guestName} />;
      
    case 'modern':
      return <ModernClean data={data} guestName={guestName} />;

    case 'javanese':
      return <TraditionalJavanese data={data} guestName={guestName} />;
      
    default:
      return <ElegantGold data={data} guestName={guestName} />;
  }
}
