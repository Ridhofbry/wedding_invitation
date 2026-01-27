"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Leaf, Calendar, MapPin, MailOpen, Music, Play, Quote } from 'lucide-react';

interface TemplateProps { data: any; guestName?: string; }

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
    if (audioRef.current) audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause(); else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
  const leafFloat = { animate: { y: [0, -20, 0], rotate: [0, 5, -5, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } } };

  return (
    // Background Texture Kertas Tua
    <div className="w-full min-h-screen bg-[#F0EFEB] text-[#4A5D44] font-serif relative overflow-x-hidden selection:bg-[#A3B18A]/50">
      <audio ref={audioRef} src={data.audioUrl} loop />

      {/* --- WELCOME OVERLAY --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[100] bg-[#DAD7CD] flex flex-col items-center justify-center p-6 shadow-2xl"
          >
            {/* Background Pattern Daun */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.8 }}
              className="bg-[#F0EFEB] p-8 md:p-12 rounded-t-[10rem] rounded-b-[2rem] border-[8px] border-[#A3B18A] shadow-xl text-center max-w-sm w-full relative overflow-hidden"
            >
               {/* Hiasan Gantung */}
               <motion.div variants={leafFloat} animate="animate" className="absolute top-4 left-1/2 -translate-x-1/2">
                  <Leaf className="w-8 h-8 text-[#588157]" />
               </motion.div>

               <div className="mt-8 space-y-6">
                  <p className="text-xs tracking-[0.3em] uppercase text-[#A3B18A]">The Wedding Of</p>
                  <div className="font-serif italic text-4xl text-[#344E41] space-y-2">
                    <p>{data.couple.groom.firstName}</p>
                    <p className="text-2xl text-[#A3B18A]">&</p>
                    <p>{data.couple.bride.firstName}</p>
                  </div>
                  
                  <div className="w-full h-[1px] bg-[#A3B18A]/50 my-6"></div>
                  
                  <div className="space-y-4">
                    <p className="text-xs text-[#588157]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                    <div className="bg-white/50 py-3 px-4 rounded-lg">
                      <p className="text-lg font-bold text-[#344E41]">{guestName || "Tamu Undangan"}</p>
                    </div>
                    <button onClick={handleOpenInvitation} className="w-full py-3 bg-[#588157] text-white rounded-full text-sm hover:bg-[#3A5A40] transition-colors shadow-lg flex items-center justify-center gap-2">
                      <MailOpen className="w-4 h-4" /> Buka Undangan
                    </button>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <div className="relative min-h-screen pb-24">
        
        {/* HERO SECTION */}
        <div className="min-h-screen relative flex flex-col items-center justify-end pb-20">
           {/* Cover Image Full Screen */}
           <div className="absolute inset-0 z-0">
             {data.images.cover ? (
               <img src={data.images.cover} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full bg-[#A3B18A] flex items-center justify-center"><Leaf className="w-20 h-20 text-white/50" /></div>
             )}
             {/* Gradient Overlay dari bawah ke atas */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#F0EFEB] via-[#F0EFEB]/60 to-transparent"></div>
           </div>

           {/* Content */}
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }}
             className="relative z-10 text-center space-y-4 px-6 w-full max-w-lg"
           >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-1 border border-[#588157] rounded-full bg-[#F0EFEB]/80 backdrop-blur-sm text-xs tracking-widest uppercase mb-4">
                We Are Getting Married
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-6xl font-serif text-[#344E41]">{data.couple.groom.firstName}</motion.h1>
              <motion.span variants={fadeInUp} className="block text-4xl text-[#A3B18A] font-light">&</motion.span>
              <motion.h1 variants={fadeInUp} className="text-6xl font-serif text-[#344E41]">{data.couple.bride.firstName}</motion.h1>
              
              <motion.div variants={fadeInUp} className="pt-8">
                 <div className="flex justify-center items-center gap-4 text-[#588157] font-sans font-bold tracking-widest text-sm border-t border-b border-[#A3B18A] py-3">
                    <span>{formatDate(data.event.date)}</span>
                 </div>
              </motion.div>
           </motion.div>
        </div>

        {/* QUOTE SECTION */}
        <div className="px-8 py-20 bg-[#DAD7CD]/30 text-center relative">
           <Quote className="w-8 h-8 text-[#A3B18A] mx-auto mb-6 rotate-180" />
           <p className="text-sm md:text-base leading-relaxed italic text-[#344E41] font-medium max-w-xl mx-auto">"{data.content.quote}"</p>
           <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#588157]">{data.content.quoteSource}</p>
        </div>

        {/* COUPLE PROFILE */}
        <div className="py-20 px-6 max-w-4xl mx-auto space-y-16">
           {/* Groom Card */}
           <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-[2rem] shadow-lg border-b-8 border-[#A3B18A]">
              <div className="w-32 h-32 bg-[#A3B18A] rounded-full flex items-center justify-center shrink-0">
                 <span className="text-5xl text-white font-serif">P</span>
              </div>
              <div className="text-center md:text-left">
                 <h3 className="text-3xl text-[#344E41] font-bold mb-2">{data.couple.groom.fullName}</h3>
                 <p className="text-sm text-[#588157]">Putra dari Bpk/Ibu:</p>
                 <p className="text-lg text-[#344E41]">{data.couple.groom.parents || "Nama Orang Tua"}</p>
              </div>
           </motion.div>

           {/* Bride Card */}
           <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white p-6 rounded-[2rem] shadow-lg border-b-8 border-[#A3B18A]">
              <div className="w-32 h-32 bg-[#A3B18A] rounded-full flex items-center justify-center shrink-0">
                 <span className="text-5xl text-white font-serif">W</span>
              </div>
              <div className="text-center md:text-right">
                 <h3 className="text-3xl text-[#344E41] font-bold mb-2">{data.couple.bride.fullName}</h3>
                 <p className="text-sm text-[#588157]">Putri dari Bpk/Ibu:</p>
                 <p className="text-lg text-[#344E41]">{data.couple.bride.parents || "Nama Orang Tua"}</p>
              </div>
           </motion.div>
        </div>

        {/* EVENT DETAILS */}
        <div className="py-12 px-4">
           <div className="max-w-md mx-auto bg-[#344E41] text-[#F0EFEB] rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
              
              <div className="relative z-10 space-y-8">
                 <h2 className="text-2xl font-serif border-b border-[#A3B18A] pb-4 inline-block">Waktu & Lokasi</h2>
                 
                 <div className="space-y-2">
                    <Calendar className="w-8 h-8 mx-auto text-[#A3B18A]" />
                    <p className="text-xl font-bold">{formatDate(data.event.date)}</p>
                    <p className="opacity-80">{data.event.timeStart} - {data.event.timeEnd} WIB</p>
                 </div>

                 <div className="space-y-2 pt-4">
                    <MapPin className="w-8 h-8 mx-auto text-[#A3B18A]" />
                    <p className="text-xl font-bold">{data.event.locationName}</p>
                    <p className="opacity-80 text-sm px-4">{data.event.address}</p>
                 </div>

                 <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.event.locationName)}`} target="_blank" className="inline-block mt-4 bg-[#A3B18A] text-[#344E41] px-8 py-3 rounded-full font-bold hover:bg-[#DAD7CD] transition-colors">
                    Lihat Peta
                 </a>
              </div>
           </div>
        </div>

        {/* GALLERY */}
        {(data.images.gallery1 || data.images.gallery2) && (
          <div className="py-16 px-6">
             <h2 className="text-center text-2xl font-serif text-[#344E41] mb-8">Galeri Bahagia</h2>
             <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
               {data.images.gallery1 && <div className="rounded-2xl overflow-hidden shadow-lg aspect-square"><img src={data.images.gallery1} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>}
               {data.images.gallery2 && <div className="rounded-2xl overflow-hidden shadow-lg aspect-square mt-8"><img src={data.images.gallery2} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>}
             </div>
          </div>
        )}

      </div>

      {/* AUDIO CONTROL */}
      <div className="fixed bottom-6 right-6 z-50">
         <button onClick={toggleAudio} className={`w-12 h-12 rounded-full bg-[#344E41] text-[#A3B18A] flex items-center justify-center shadow-lg border-2 border-[#A3B18A] ${isPlaying ? 'animate-spin-slow' : ''}`}>
            {isPlaying ? <Music className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
         </button>
      </div>

    </div>
  );
}
