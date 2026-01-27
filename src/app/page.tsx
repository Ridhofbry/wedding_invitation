"use client";

import React from 'react';
import { InvitationProvider } from '@/components/providers/InvitationContext';
import Sidebar from '@/components/editor/Sidebar';
import LivePreview from '@/components/editor/LivePreview';

export default function EditorPage() {
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

        {/* Mobile Warning (Optional) */}
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/90 text-white flex items-center justify-center p-8 text-center backdrop-blur-sm lg:pointer-events-none lg:opacity-0">
          <div>
            <h3 className="text-xl font-bold mb-2">Mode Desktop Disarankan</h3>
            <p className="text-sm opacity-80">Untuk pengalaman mengedit terbaik, harap gunakan layar yang lebih besar (Laptop/PC).</p>
            <button 
              className="mt-4 px-4 py-2 bg-white text-slate-900 rounded text-sm font-medium"
              onClick={(e) => e.currentTarget.parentElement?.parentElement?.remove()}
            >
              Lanjutkan Saja
            </button>
          </div>
        </div>

      </div>
    </InvitationProvider>
  );
}
