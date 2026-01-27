"use client";

import React, { useState } from 'react';
import { InvitationProvider } from '@/components/providers/InvitationContext';
import Sidebar from '@/components/editor/Sidebar';
import LivePreview from '@/components/editor/LivePreview';

export default function EditorPage() {
  const [showMobileWarning, setShowMobileWarning] = useState(true);

  return (
    <InvitationProvider>
      <div className="flex h-screen w-full bg-white overflow-hidden font-sans text-slate-900">
        
        {/* Left Panel: Sidebar (Editor) */}
        <div className="w-full lg:w-[450px] flex-shrink-0 h-full border-r border-slate-200 z-10 bg-white shadow-xl lg:shadow-none">
          <Sidebar />
        </div>

        {/* Right Panel: Live Preview */}
        <div className="hidden lg:block flex-1 h-full relative">
          <LivePreview />
        </div>

        {/* Mobile Warning */}
        {showMobileWarning && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/95 text-white flex items-center justify-center p-8 text-center backdrop-blur-sm">
            <div className="max-w-xs">
              <h3 className="text-xl font-bold mb-3">Mode Desktop Disarankan</h3>
              <p className="text-sm opacity-80 mb-6">Editor ini didesain untuk layar besar. Silakan buka di Laptop/PC untuk pengalaman maksimal.</p>
              <button 
                className="px-6 py-2 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-slate-200 transition"
                onClick={() => setShowMobileWarning(false)}
              >
                Lanjutkan Saja
              </button>
            </div>
          </div>
        )}

      </div>
    </InvitationProvider>
  );
}
