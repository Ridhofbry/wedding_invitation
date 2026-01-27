"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { ArrowRight, MapPin, Calendar, Music, Play, Pause, Minus } from 'lucide-react';

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

export default function ModernClean({ data, guestName }: TemplateProps) {
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

  // Animasi "Slide In" yang tajam (Cubic Bezier untuk efek snap)
  const slideUpSharp = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      <audio ref={audioRef} src={data.audioUrl} loop />

      {/* --- WELCOME SCREEN (Monochrome Overlay) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between p-8"
          >
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-[0.3em] uppercase">The Wedding Of</p>
              <h1 className="text-6xl font-black tracking-tighter leading-[0.8]">
                {data.couple.groom.firstName}<br/>
                <span className="text-gray-500">&</span><br/>
                {data.couple.bride.firstName}
              </h1>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-xs text-gray-400 mb-1">Kepada Yth.</p>
                <p className="text-xl font-bold">{guestName || "Tamu Undangan"}</p>
              </div>
              
              <button 
                onClick={handleOpenInvitation}
                className="group w-full flex items-center justify-between border-b border-white pb-4 hover:pl-4 transition-all duration-300"
              >
                <span className="text-lg font-bold tracking-widest uppercase">Buka Undangan</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <div className="relative pb-20">
        
        {/* HERO SECTION (Full Screen Image with Overlay Text) */}
        <div className="h-screen w-full relative overflow-hidden">
           {data.images.cover ? (
             <motion.img 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 2 }}
               src={data.images.cover} 
               className="w-full h-full object-cover filter grayscale contrast-125" 
               alt="Cover" 
             />
           ) : (
             <div className="w-full h-full bg-gray-200" />
           )}
           
           <div className="absolute inset-0 bg-black/30" />

           <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              <motion.h1 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUpSharp}
                className="text-[120px] md:text-[180px] font-black text-white leading-none tracking-tighter mix-blend-overlay opacity-90 select-none"
              >
                {data.couple.groom.firstName.charAt(0)}&{data.couple.bride.firstName.charAt(0)}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 left-0 w-full px-8 flex justify-between items-end text-white"
              >
                 <p className="text-xs font-bold tracking-[0.2em] uppercase max-w-[100px] text-left">We Are Getting Married</p>
                 <p className="text-sm font-bold">{formatDate(data.event.date)}</p>
              </motion.div>
           </div>
        </div>

        {/* QUOTE (Bold & Minimal) */}
        <div className="px-6 py-24 bg-white">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={slideUpSharp}
             className="max-w-2xl mx-auto border-l-4 border-black pl-6"
           >
              <p className="text-lg md:text-2xl font-bold leading-tight mb-4">
                "{data.content.quote}"
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                — {data.content.quoteSource}
              </p>
           </motion.div>
        </div>

        {/* COUPLE (Asymmetric Layout) */}
        <div className="py-12 overflow-hidden">
           {/* Groom */}
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={slideInLeft}
             className="flex flex-col md:flex-row items-end gap-4 mb-20 pr-12"
           >
              <div className="w-full md:w-1/2 h-[400px] bg-gray-100 relative">
                 <div className="absolute top-4 left-4 w-full h-full border-2 border-black z-0"></div>
                 <div className="relative z-10 w-full h-full bg-gray-300 overflow-hidden grayscale">
                    <div className="w-full h-full flex items-center justify-center bg-black text-white text-9xl font-black">
                       {data.couple.groom.firstName.charAt(0)}
                    </div>
                 </div>
              </div>
              <div className="text-right w-full md:w-1/2 pt-4">
                 <h2 className="text-5xl font-black uppercase tracking-tighter mb-2">{data.couple.groom.firstName}</h2>
                 <p className="text-sm font-bold">{data.couple.groom.fullName}</p>
                 <p className="text-xs text-gray-500 mt-1">Putra dari {data.couple.groom.parents}</p>
              </div>
           </motion.div>

           {/* Bride */}
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={slideInRight}
             className="flex flex-col-reverse md:flex-row items-start gap-4 pl-12"
           >
              <div className="text-left w-full md:w-1/2 pt-4">
                 <h2 className="text-5xl font-black uppercase tracking-tighter mb-2">{data.couple.bride.firstName}</h2>
                 <p className="text-sm font-bold">{data.couple.bride.fullName}</p>
                 <p className="text-xs text-gray-500 mt-1">Putri dari {data.couple.bride.parents}</p>
              </div>
              <div className="w-full md:w-1/2 h-[400px] bg-gray-100 relative">
                 <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-black z-0"></div>
                 <div className="relative z-10 w-full h-full bg-gray-300 overflow-hidden grayscale">
                    <div className="w-full h-full flex items-center justify-center bg-black text-white text-9xl font-black">
                       {data.couple.bride.firstName.charAt(0)}
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* EVENT INFO (Grid Layout) */}
        <div className="bg-black text-white py-24 px-6">
           <div className="max-w-3xl mx-auto">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUpSharp}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                 <div className="space-y-6 border-l border-white/30 pl-6">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-6 h-6" />
                       <span className="text-sm font-bold uppercase tracking-widest">Waktu</span>
                    </div>
                    <div>
                       <p className="text-3xl font-black">{formatDate(data.event.date)}</p>
                       <p className="text-lg font-medium mt-2 text-gray-400">{data.event.timeStart} — {data.event.timeEnd}</p>
                    </div>
                 </div>

                 <div className="space-y-6 border-l border-white/30 pl-6">
                    <div className="flex items-center gap-2">
                       <MapPin className="w-6 h-6" />
                       <span className="text-sm font-bold uppercase tracking-widest">Tempat</span>
                    </div>
                    <div>
                       <p className="text-2xl font-bold leading-none mb-2">{data.event.locationName}</p>
                       <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{data.event.address}</p>
                       <a 
                         href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.event.locationName)}`} 
                         target="_blank"
                         rel="noreferrer"
                         className="inline-block mt-4 text-xs font-bold uppercase border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors"
                       >
                         Lihat Peta
                       </a>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* GALLERY (Masonry Layout) */}
        {(data.images.gallery1 || data.images.gallery2) && (
          <div className="py-24 px-4 bg-white">
             <div className="flex items-center gap-4 mb-12">
               <h2 className="text-4xl font-black uppercase tracking-tighter">Gallery</h2>
               <div className="h-1 bg-black flex-1"></div>
             </div>
             
             {/* Masonry-like layout using CSS Columns */}
             <div className="columns-2 gap-4 space-y-4">
                {data.images.gallery1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="break-inside-avoid"
                  >
                    <img src={data.images.gallery1} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="Gallery 1" />
                  </motion.div>
                )}
                {/* Decorative Text Block inside Masonry */}
                <div className="break-inside-avoid bg-black text-white p-8 flex items-center justify-center text-center aspect-square">
                   <p className="font-bold text-2xl leading-none">FOREVER<br/>& ALWAYS</p>
                </div>
                {data.images.gallery2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="break-inside-avoid"
                  >
                    <img src={data.images.gallery2} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="Gallery 2" />
                  </motion.div>
                )}
             </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="py-12 bg-white text-center">
           <p className="text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
             <Minus className="w-4 h-4" /> Modern Clean Theme <Minus className="w-4 h-4" />
           </p>
        </div>

      </div>

      {/* --- FLOATING AUDIO BUTTON (Black & White) --- */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[90]">
          <button 
            onClick={toggleAudio}
            className={`w-14 h-14 flex items-center justify-center rounded-full bg-black text-white border-2 border-white shadow-xl transition-transform hover:scale-110 active:scale-95 ${isPlaying ? 'animate-spin-slow' : ''}`}
          >
             {isPlaying ? <Music className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
        </div>
      )}

    </div>
  );
}
