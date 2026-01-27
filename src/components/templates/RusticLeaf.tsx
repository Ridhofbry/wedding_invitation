"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Leaf, Calendar, MapPin, MailOpen, Music, Play, Pause } from 'lucide-react';

// Definisi Interface (Sama seperti ElegantGold, idealnya diimport dari shared types)
interface InvitationData {
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
}

interface TemplateProps {
  data: InvitationData;
  guestName?: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

export default function RusticLeaf({ data, guestName }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay prevented:", err));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F9F5] text-[#2F3E32] font-sans relative overflow-x-hidden">
      
      <audio ref={audioRef} src={data.audioUrl} loop />

      {/* --- WELCOME OVERLAY --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-[#E1E8DE] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="bg-white p-10 rounded-3xl shadow-xl max-w-sm w-full border border-white/50 relative overflow-hidden">
                <Leaf className="w-12 h-12 text-[#7A9A74] mx-auto mb-6 opacity-50" />
                <p className="text-xs uppercase tracking-[0.2em] text-[#5F7A5B] mb-2">The Wedding Of</p>
                <h1 className="text-3xl font-bold text-[#2F3E32] mb-6">{data.couple.groom.firstName} & {data.couple.bride.firstName}</h1>
                
                <div className="border-t border-[#E8EAE6] my-6 pt-6">
                  <p className="text-xs text-gray-500 mb-2">Kepada Yth.</p>
                  <p className="text-lg font-semibold mb-6">{guestName || "Tamu Undangan"}</p>
                  <button 
                    onClick={handleOpenInvitation}
                    className="w-full bg-[#5F7A5B] text-white py-3 rounded-xl font-medium shadow-lg hover:bg-[#4A6347] transition-colors flex items-center justify-center gap-2"
                  >
                    <MailOpen className="w-4 h-4" /> Buka Undangan
                  </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <div className="relative pb-20">
        
        {/* Dekorasi Sudut */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E1E8DE] rounded-bl-[100px] z-0 opacity-50"></div>
        <div className="absolute top-0 left-0 w-24 h-24 bg-[#E1E8DE] rounded-br-[80px] z-0 opacity-50"></div>

        {/* Hero Image */}
        {data.images.cover ? (
          <div className="h-96 w-full relative overflow-hidden rounded-b-[50px] shadow-sm z-10">
             <img src={data.images.cover} className="w-full h-full object-cover" alt="Cover" />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ) : (
          <div className="h-96 w-full bg-[#E1E8DE] rounded-b-[50px] z-10 flex items-center justify-center text-[#7A9A74]">
             <Leaf className="w-16 h-16 opacity-30" />
          </div>
        )}
        
        {/* Header Text */}
        <div className="px-8 -mt-20 relative z-20 text-center">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-[#E8EAE6]">
            <Leaf className="w-6 h-6 mx-auto mb-3 text-[#7A9A74]" />
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Pernikahan</p>
            <h1 className="text-4xl font-bold text-[#2F3E32] mb-1">{data.couple.groom.firstName}</h1>
            <div className="text-xl font-serif italic text-[#7A9A74] my-1">&</div>
            <h1 className="text-4xl font-bold text-[#2F3E32]">{data.couple.bride.firstName}</h1>
          </div>
        </div>

        {/* Quote */}
        <div className="p-10 text-center">
           <p className="text-sm italic text-gray-600 leading-loose">"{data.content.quote}"</p>
        </div>

        {/* Event Cards */}
        <div className="px-6 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#E9EDE9] p-6 rounded-2xl flex items-center gap-4 border border-[#DAE0DA]"
          >
            <div className="bg-white p-3 rounded-full text-[#5F7A5B] shadow-sm">
               <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#5F7A5B] font-bold uppercase tracking-wider">Tanggal</p>
              <p className="font-semibold text-lg">{formatDate(data.event.date)}</p>
              <p className="text-xs text-gray-500">{data.event.timeStart} - {data.event.timeEnd} WIB</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#E9EDE9] p-6 rounded-2xl flex items-center gap-4 border border-[#DAE0DA]"
          >
            <div className="bg-white p-3 rounded-full text-[#5F7A5B] shadow-sm">
               <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-[#5F7A5B] font-bold uppercase tracking-wider">Lokasi</p>
              <p className="font-semibold text-lg leading-tight">{data.event.locationName}</p>
              <p className="text-xs text-gray-500 mt-1">{data.event.address}</p>
            </div>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        {(data.images.gallery1 || data.images.gallery2) && (
          <div className="px-6 mt-10">
            <h3 className="text-center text-[#5F7A5B] font-bold uppercase tracking-widest text-sm mb-6">Galeri Foto</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.images.gallery1 && (
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md">
                  <img src={data.images.gallery1} className="w-full h-full object-cover" alt="Gallery 1" />
                </div>
              )}
              {data.images.gallery2 && (
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md mt-4">
                  <img src={data.images.gallery2} className="w-full h-full object-cover" alt="Gallery 2" />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 text-center opacity-40 pb-8">
           <Leaf className="w-4 h-4 mx-auto mb-2" />
           <p className="text-[10px] tracking-widest uppercase">Rustic Nature Theme</p>
        </div>

      </div>

      {/* Floating Audio */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[90]">
          <button 
            onClick={toggleAudio}
            className={`w-12 h-12 flex items-center justify-center rounded-full bg-[#5F7A5B] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 ${isPlaying ? 'ring-2 ring-[#9AB098]' : ''}`}
          >
             {isPlaying ? <Music className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5 ml-1" />}
          </button>
        </div>
      )}

    </div>
  );
}
