"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Leaf, Calendar, MapPin, MailOpen, Music, Play, Heart } from 'lucide-react';

interface TemplateProps {
  data: any; // Menggunakan any agar fleksibel menerima data baru
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
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
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
            initial={{ y: 0 }} exit={{ y: "-100%", transition: { duration: 1, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-[#E1E8DE] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="bg-white p-8 rounded-[2rem] shadow-xl max-w-sm w-full border border-white/50 relative">
                <Leaf className="w-10 h-10 text-[#7A9A74] mx-auto mb-4 opacity-60" />
                <p className="text-xs uppercase tracking-[0.2em] text-[#5F7A5B] mb-2">The Wedding Of</p>
                <h1 className="text-3xl font-bold text-[#2F3E32] mb-6 font-serif">{data.couple.groom.firstName} & {data.couple.bride.firstName}</h1>
                <div className="bg-[#F1F4F0] p-4 rounded-xl mb-6">
                  <p className="text-xs text-gray-500 mb-1">Kepada Yth.</p>
                  <p className="text-lg font-bold text-[#4A6347] capitalize">{guestName || "Tamu Undangan"}</p>
                </div>
                <button onClick={handleOpenInvitation} className="w-full bg-[#5F7A5B] text-white py-3 rounded-full font-medium shadow-lg hover:bg-[#4A6347] transition-all flex items-center justify-center gap-2">
                  <MailOpen className="w-4 h-4" /> Buka Undangan
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTENT --- */}
      <div className="relative pb-24">
        {/* Header Image */}
        <div className="h-[400px] w-full relative">
           {data.images.cover ? (
             <img src={data.images.cover} className="w-full h-full object-cover rounded-b-[3rem]" alt="Cover" />
           ) : (
             <div className="w-full h-full bg-[#D8E2D5] flex items-center justify-center rounded-b-[3rem]"><Leaf className="w-20 h-20 text-white opacity-50"/></div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-[#F7F9F5] via-transparent to-transparent"></div>
        </div>

        {/* Title Section */}
        <div className="text-center -mt-20 relative z-10 px-6">
           <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white">
              <p className="text-[#5F7A5B] text-sm mb-2 font-medium tracking-wide">{data.content.greeting || "Assalamu’alaikum Wr. Wb."}</p>
              <div className="my-6 space-y-2">
                <h1 className="text-4xl font-serif text-[#2F3E32]">{data.couple.groom.firstName}</h1>
                <span className="text-2xl text-[#7A9A74] font-serif">&</span>
                <h1 className="text-4xl font-serif text-[#2F3E32]">{data.couple.bride.firstName}</h1>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Akan Menikah</p>
           </div>
        </div>

        {/* --- BAGIAN BARU: DATA LENGKAP MEMPELAI --- */}
        <div className="px-6 py-12 space-y-12">
           {/* Pria */}
           <div className="text-center space-y-3">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#E1E8DE]">
                 {/* Jika ada foto pria nanti bisa ditambah, skrg pakai inisial */}
                 <div className="w-full h-full flex items-center justify-center text-4xl font-serif text-[#7A9A74]">P</div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2F3E32]">{data.couple.groom.fullName}</h2>
              <div className="text-sm text-gray-600 leading-relaxed bg-[#E9EDE9] p-4 rounded-xl mx-auto max-w-xs">
                <p className="font-medium text-[#5F7A5B] mb-1">Putra dari:</p>
                <p>{data.couple.groom.parents || "Bpk... & Ibu..."}</p>
              </div>
           </div>

           {/* Icon Tengah */}
           <div className="flex justify-center"><Heart className="w-6 h-6 text-[#7A9A74] fill-current opacity-50"/></div>

           {/* Wanita */}
           <div className="text-center space-y-3">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#E1E8DE]">
                 <div className="w-full h-full flex items-center justify-center text-4xl font-serif text-[#7A9A74]">W</div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2F3E32]">{data.couple.bride.fullName}</h2>
              <div className="text-sm text-gray-600 leading-relaxed bg-[#E9EDE9] p-4 rounded-xl mx-auto max-w-xs">
                <p className="font-medium text-[#5F7A5B] mb-1">Putri dari:</p>
                <p>{data.couple.bride.parents || "Bpk... & Ibu..."}</p>
              </div>
           </div>
        </div>

        {/* Event Details */}
        <div className="px-4">
          <div className="bg-[#4A6347] text-white p-8 rounded-3xl text-center shadow-lg relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-serif mb-6 border-b border-white/20 pb-4 inline-block">Akad & Resepsi</h3>
                
                <div className="flex flex-col items-center gap-2">
                   <Calendar className="w-6 h-6 text-[#AECCA8]"/>
                   <p className="text-xl font-bold">{formatDate(data.event.date)}</p>
                   <p className="text-sm opacity-80">{data.event.timeStart} - {data.event.timeEnd} WIB</p>
                </div>

                <div className="flex flex-col items-center gap-2 mt-6">
                   <MapPin className="w-6 h-6 text-[#AECCA8]"/>
                   <p className="text-lg font-semibold leading-tight">{data.event.locationName}</p>
                   <p className="text-xs opacity-70 max-w-[200px] mx-auto">{data.event.address}</p>
                </div>

                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.event.locationName)}`} target="_blank" className="inline-block mt-4 px-6 py-2 bg-white text-[#4A6347] rounded-full text-xs font-bold hover:bg-[#E1E8DE] transition">
                  Lihat Lokasi
                </a>
             </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="p-10 text-center space-y-4">
           <p className="text-sm italic text-gray-600 leading-loose">"{data.content.quote}"</p>
           <p className="text-xs font-bold text-[#5F7A5B] uppercase tracking-widest">{data.content.quoteSource}</p>
        </div>

        {/* Gallery */}
        {(data.images.gallery1 || data.images.gallery2) && (
          <div className="px-6 pb-12">
            <h3 className="text-center text-[#5F7A5B] font-bold uppercase text-sm mb-6 tracking-widest">Galeri Kami</h3>
            <div className="grid grid-cols-2 gap-3">
               {data.images.gallery1 && <img src={data.images.gallery1} className="rounded-2xl w-full h-40 object-cover shadow-sm" />}
               {data.images.gallery2 && <img src={data.images.gallery2} className="rounded-2xl w-full h-40 object-cover shadow-sm mt-4" />}
            </div>
          </div>
        )}
      </div>

      {/* Floating Audio */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[90]">
          <button onClick={toggleAudio} className={`w-12 h-12 flex items-center justify-center rounded-full bg-[#5F7A5B] text-white shadow-lg ${isPlaying ? 'animate-spin-slow' : ''}`}>
             {isPlaying ? <Music className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>
        </div>
      )}
    </div>
  );
}
