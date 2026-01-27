"use client";

import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { useInvitationStore } from '@/components/providers/InvitationContext';
import TemplateRenderer from '@/components/templates/TemplateRenderer';

export default function LivePreview() {
  const { data } = useInvitationStore();
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="flex flex-col h-screen bg-slate-200 border-l border-slate-300">
      
      {/* Toolbar Preview */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm z-20 shrink-0">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Preview</span>
        <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
          <button 
            onClick={() => setDevice('mobile')} 
            className={`p-2 rounded-md transition-all ${device === 'mobile' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            title="Tampilan HP"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setDevice('desktop')} 
            className={`p-2 rounded-md transition-all ${device === 'desktop' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            title="Tampilan Desktop"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden flex items-center justify-center p-4 bg-slate-200/50 pattern-grid-lg">
        
        {/* Device Frame */}
        <div 
          className={`transition-all duration-500 relative shadow-2xl bg-slate-900 
          ${device === 'mobile' 
            ? 'w-[375px] h-[calc(100vh-100px)] max-h-[800px] min-h-[600px] border-[14px] border-slate-900 rounded-[3rem]' 
            : 'w-full h-full border-0 rounded-none'}`}
        >
          {/* Inner Screen Container */}
          <div className={`w-full h-full bg-white overflow-hidden relative ${device === 'mobile' ? 'rounded-[2.2rem]' : ''}`}>
             
             {/* Notch Effect (Mobile Only) */}
             {device === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-slate-900 rounded-b-xl z-50 pointer-events-none"></div>
             )}

             {/* Independent Scrollable Area */}
             <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                
                {/* RENDER TEMPLATE HERE */}
                <TemplateRenderer data={data} guestName={data.guestName} />

             </div>
          </div>

          {/* Tombol Samping HP (Hiasan) */}
          {device === 'mobile' && (
            <>
              <div className="absolute top-24 -left-[18px] w-[4px] h-8 bg-slate-800 rounded-l"></div>
              <div className="absolute top-36 -left-[18px] w-[4px] h-12 bg-slate-800 rounded-l"></div>
              <div className="absolute top-24 -right-[18px] w-[4px] h-16 bg-slate-800 rounded-r"></div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
