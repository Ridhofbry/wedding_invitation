"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  Heart, Calendar, MapPin, MailOpen, Music, 
  Play, Pause 
} from 'lucide-react';

// Definisi tipe data (bisa dipindah ke file types.ts jika mau)
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

export default function ElegantGold({ data, guestName }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handler untuk membuka undangan & memutar musik
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay prevented by browser:", err));
    }
  };

  // Handler toggle musik
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

  // Variabel Animasi Framer Motion
  const fadeInUp = { 
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
  };
  
  const staggerContainer = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } } 
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-amber-50 font-serif relative overflow-x-hidden selection:bg-amber-500/30">
      
      {/* Audio Element (Hidden) */}
      <audio ref={audioRef} src={data.audioUrl} loop />

      {/* --- WELCOME SCREEN (OVERLAY) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-center p-6 border-b-[6px] border-amber-700/50 shadow-2xl"
          >
            {/* Background Cover Image */}
            <div className="absolute inset-0 z-0">
               {data.images.cover ? (
                 <img src={data.images.cover} className="w-full h-full object-cover opacity-40 grayscale blur-[2px]" alt="cover" />
               ) : (
                 <div className="w-full h-full bg-slate-900" />
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/60"></div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 space-y-8 max-w-sm w-full"
            >
              <div className="space-y-4 border-y border-amber-500/20 py-8 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-500 font-sans mb-4">The Wedding Of</p>
                <h1 className="text-4xl md:text-5xl text-amber-100 italic font-medium">{data.couple.groom.firstName} & {data.couple.bride.firstName}</h1>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-amber-500/10 backdrop-blur-md shadow-xl">
                <p className="text-xs text-slate-300 font-sans tracking-wide mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <p className="text-xl md:text-2xl text-amber-100 font-bold capitalize mb-6">{guestName || "Tamu Undangan"}</p>
                
                <button 
                  onClick={handleOpenInvitation}
                  className="group relative inline-flex items-center justify-center gap-2 w-full px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-full text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  <MailOpen className="w-4 h-4" />
                  Buka Undangan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT (SCROLLABLE) --- */}
      <div className="relative min-h-screen pb-20">
        
        {/* Decorative Top Gradient */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent z-40"></div>

        {/* HERO SECTION */}
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8 relative overflow-hidden">
           {/* Background Hero */}
           {data.images.cover && (
             <div className="absolute inset-0 pointer-events-none">
                <img src={data.images.cover} className="w-full h-full object-cover opacity-30 fixed" alt="bg" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
             </div>
           )}

           {/* Spinning Ornament Decoration */}
           <motion.div 
              className="absolute w-[600px] h-[600px] border border-dashed border-amber-500/10 rounded-full z-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
           />

           {/* Hero Text */}
           <motion.div 
              variants={staggerContainer} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="relative z-10 space-y-6"
           >
             <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.3em] text-amber-500/80 font-sans">We Are Getting Married</motion.p>
             
             <div className="space-y-2">
               <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-200 to-amber-600 italic font-serif leading-tight drop-shadow-sm">
                 {data.couple.groom.firstName}
               </motion.h1>
               <motion.div variants={fadeInUp} className="text-3xl text-amber-700 font-light font-sans py-2">
                 — & —
               </motion.div>
               <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-200 to-amber-600 italic font-serif leading-tight drop-shadow-sm">
                 {data.couple.bride.firstName}
               </motion.h1>
             </div>

             <motion.div variants={fadeInUp} className="pt-8">
                <div className="inline-flex items-center gap-2 px-6 py-2 border border-amber-500/30 rounded-full bg-slate-900/40 backdrop-blur-md">
                   <Calendar className="w-4 h-4 text-amber-500" />
                   <span className="text-sm tracking-widest text-amber-100/80 uppercase">{formatDate(data.event.date)}</span>
                </div>
             </motion.div>
           </motion.div>
        </div>

        {/* QUOTE SECTION */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-24 px-8 bg-slate-900/30 text-center relative z-10"
        >
            <div className="max-w-2xl mx-auto">
                <p className="text-base md:text-xl font-light leading-relaxed text-amber-100/80 italic font-serif">"{data.content.quote}"</p>
                <div className="mt-8 w-16 h-[1px] bg-amber-600 mx-auto opacity-50"></div>
                <p className="mt-4 text-xs font-bold text-amber-500 uppercase tracking-widest font-sans">{data.content.quoteSource}</p>
            </div>
        </motion.div>
        
        {/* COUPLE DETAILS SECTION */}
        <div className="py-24 px-6 relative z-10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 items-center text-center">
             
             {/* Groom */}
             <motion.div 
               initial="hidden" 
               whileInView="visible" 
               viewport={{ once: true, margin: "-100px" }}
               variants={staggerContainer} 
               className="space-y-6"
             >
               <motion.div variants={scaleIn} className="w-40 h-40 mx-auto rounded-full bg-slate-800 border-[3px] border-amber-500/20 flex items-center justify-center overflow-hidden shadow-2xl relative group">
                 <span className="text-5xl text-amber-900 font-serif group-hover:scale-110 transition-transform duration-500">P</span>
               </motion.div>
               <motion.div variants={fadeInUp}>
                  <h3 className="text-3xl text-amber-100 italic font-medium">{data.couple.groom.fullName}</h3>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">Putra tercinta dari<br/><span className="text-amber-200/70">{data.couple.groom.parents}</span></p>
               </motion.div>
             </motion.div>

             {/* Heart Icon */}
             <Heart className="w-8 h-8 text-amber-600 mx-auto animate-pulse hidden md:block" />
             
             {/* Bride */}
             <motion.div 
               initial="hidden" 
               whileInView="visible" 
               viewport={{ once: true, margin: "-100px" }}
               variants={staggerContainer} 
               className="space-y-6"
             >
               <motion.div variants={scaleIn} className="w-40 h-40 mx-auto rounded-full bg-slate-800 border-[3px] border-amber-500/20 flex items-center justify-center overflow-hidden shadow-2xl relative group">
                 <span className="text-5xl text-amber-900 font-serif group-hover:scale-110 transition-transform duration-500">W</span>
               </motion.div>
               <motion.div variants={fadeInUp}>
                  <h3 className="text-3xl text-amber-100 italic font-medium">{data.couple.bride.fullName}</h3>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">Putri tercinta dari<br/><span className="text-amber-200/70">{data.couple.bride.parents}</span></p>
               </motion.div>
             </motion.div>
          </div>
        </div>
        
        {/* EVENT DETAILS SECTION */}
        <div className="py-12 px-6 text-center relative z-10">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} 
             whileInView={{ scale: 1, opacity: 1 }} 
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[3rem] border border-amber-500/20 shadow-2xl group hover:border-amber-500/40 transition-colors"
           >
              <h2 className="text-xl font-serif text-amber-400 mb-8 uppercase tracking-widest border-b border-amber-500/20 pb-4 inline-block">Waktu & Tempat</h2>
              
              <div className="space-y-8">
                <div>
                  <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                  <p className="text-2xl text-amber-50 font-medium mb-1">{formatDate(data.event.date)}</p>
                  <p className="text-sm text-slate-400 font-mono bg-slate-800/50 inline-block px-3 py-1 rounded">{data.event.timeStart} - {data.event.timeEnd} WIB</p>
                </div>
                
                <div className="w-full h-[1px] bg-slate-800"></div>

                <div>
                  <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                  <p className="text-xl text-amber-50 font-medium mb-1">{data.event.locationName}</p>
                  <p className="text-sm text-slate-400 px-4 leading-relaxed mb-6">{data.event.address}</p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.event.locationName)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block px-6 py-2 border border-amber-600 text-amber-600 rounded-full text-xs font-bold hover:bg-amber-600 hover:text-slate-900 transition-colors uppercase tracking-wider"
                  >
                    Buka Google Maps
                  </a>
                </div>
              </div>
           </motion.div>
        </div>

        {/* GALLERY SECTION */}
        {(data.images.gallery1 || data.images.gallery2) && (
          <div className="pb-24 px-6 text-center relative z-10 max-w-4xl mx-auto">
             <div className="flex items-center justify-center gap-4 mb-12 opacity-60">
                <div className="h-[1px] w-12 bg-amber-500"></div>
                <h2 className="text-sm font-sans text-amber-400 uppercase tracking-[0.3em]">Our Moments</h2>
                <div className="h-[1px] w-12 bg-amber-500"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {data.images.gallery1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img src={data.images.gallery1} className="rounded-2xl border border-amber-500/10 shadow-2xl w-full aspect-[4/5] object-cover hover:scale-[1.02] transition-transform duration-500" alt="Gallery 1" />
                </motion.div>
              )}
              {data.images.gallery2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <img src={data.images.gallery2} className="rounded-2xl border border-amber-500/10 shadow-2xl w-full aspect-[4/5] object-cover hover:scale-[1.02] transition-transform duration-500" alt="Gallery 2" />
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="pb-12 text-center opacity-30">
          <p className="text-[10px] text-amber-100 tracking-widest uppercase">Created with Digital Invitation Builder</p>
        </div>
      </div>

      {/* --- FLOATING AUDIO BUTTON --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-[90]"
          >
            <button 
              onClick={toggleAudio}
              className={`w-14 h-14 flex items-center justify-center rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-500/30 text-amber-500 shadow-2xl shadow-amber-900/30 transition-all hover:scale-105 ${isPlaying ? 'ring-2 ring-amber-500/50' : ''}`}
            >
               <motion.div
                 animate={{ rotate: isPlaying ? 360 : 0 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                 className={!isPlaying ? 'opacity-50' : ''}
               >
                  <Music className="w-6 h-6" />
               </motion.div>
               {!isPlaying && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-black/20 flex items-center justify-center">
                       <Play className="w-4 h-4 fill-current ml-1" />
                    </div>
                 </div>
               )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
