"use client";

import React from 'react';
import ElegantGold from './ElegantGold';
import RusticLeaf from './RusticLeaf';
import ModernClean from './ModernClean';
import TraditionalJavanese from './TraditionalJavanese'; // Import

interface InvitationData {
  selectedTheme: string;
  [key: string]: any; 
}

interface TemplateRendererProps {
  data: InvitationData;
  guestName?: string;
}

export default function TemplateRenderer({ data, guestName = "Tamu Spesial" }: TemplateRendererProps) {
  switch (data.selectedTheme) {
    case 'elegant':
      return <ElegantGold data={data} guestName={guestName} />;
    
    case 'rustic':
      return <RusticLeaf data={data} guestName={guestName} />;
      
    case 'modern':
      return <ModernClean data={data} guestName={guestName} />;

    case 'javanese': // Case baru
      return <TraditionalJavanese data={data} guestName={guestName} />;
      
    default:
      return <ElegantGold data={data} guestName={guestName} />;
  }
}
