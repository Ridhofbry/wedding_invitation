"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Calendar, MapPin, Music, Play, Pause } from 'lucide-react';

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

// Format tanggal Indonesia
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

export default function TraditionalJavanese({ data, guestName }: TemplateProps) {
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

  // --- ANIMASI (Slow & Graceful) ---
  const fadeUpSlow = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  const scaleInSlow = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1.5, ease: "easeOut" } 
    }
  };

  // Asset Gambar Batik & Gunungan (Placeholder URL yang stabil)
  const BATIK_PATTERN = "https://www.transparenttextures.com/patterns/batik-ramp.png";
  const GUNUNGAN_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gunungan_wayang_kulit.svg/1200px-Gunungan_wayang_kulit.svg.png";

  return (
    <div className="w-full min-h-screen bg-[#2C1E16] text-[#E5C987] font-serif relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      
      <audio ref={audioRef} src={data.audioUrl} loop />

      {/* --- BACKGROUND PATTERN (Batik Samar) --- */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10 z-0"
        style={{ backgroundImage: `url(${BATIK_PATTERN})` }}
      />

      {/* --- WELCOME SCREEN (Amplop Jawa) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 z-[100] bg-[#231711] flex flex-col items-center justify-center text-center p-6 border-8 border-[#4A3728]"
          >
            {/* Ornamen Gunungan Besar */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
              className="w-48 h-auto mb-8 opacity-80"
            >
               <img src={GUNUNGAN_IMG} alt="Gunungan" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="relative z-10 space-y-6 max-w-sm w-full"
            >
              <div>
                <p className="text-sm tracking-[0.3em] text-[#D4AF37] uppercase mb-2">Pawiwahan</p>
                <h1 className="text-4xl md:text-5xl font-medium text-[#F5F5DC] tracking-wide">
                  {data.couple.groom.firstName} <span className="text-[#D4AF37] text-3xl">&</span> {data.couple.bride.firstName}
                </h1>
              </div>

              <div className="p-6 border-t border-b border-[#D4AF37]/30 space-y-4">
                <p className="text-xs text-[#E5C987] tracking-widest italic">Katur Dhumateng Bapak/Ibu/Sedherek:</p>
                <p className="text-xl font-bold text-white capitalize">{guestName || "Tamu Undangan"}</p>
              </div>
                
              <button 
                onClick={handleOpenInvitation}
                className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-[#2C1E16] transition duration-300 ease-out border-2 border-[#D4AF37] rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#D4AF37] group-hover:translate-x-0 ease">
                  <Music className="w-5 h-5" />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-[#D4AF37] transition-all duration-300 transform group-hover:translate-x-full ease">Buka Undangan</span>
                <span className="relative invisible">Buka Undangan</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 pb-20">
        
        {/* HERO SECTION */}
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-10 relative overflow-hidden">
           
           {/* Background Image Overlay */}
           {data.images.cover && (
             <div className="absolute inset-0 pointer-events-none opacity-20">
                <img src={data.images.cover} className="w-full h-full object-cover" alt="bg" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#2C1E16] via-transparent to-[#2C1E16]"></div>
             </div>
           )}

           {/* Ornamen Sudut (Frame) */}
           <div className="absolute top-4 left-4 w-24 h-24 border-t-4 border-l-4 border-[#D4AF37] rounded-tl-3xl opacity-50"></div>
           <div className="absolute top-4 right-4 w-24 h-24 border-t-4 border-r-4 border-[#D4AF37] rounded-tr-3xl opacity-50"></div>
           <div className="absolute bottom-4 left-4 w-24 h-24 border-b-4 border-l-4 border-[#D4AF37] rounded-bl-3xl opacity-50"></div>
           <div className="absolute bottom-4 right-4 w-24 h-24 border-b-4 border-r-4 border-[#D4AF37] rounded-br-3xl opacity-50"></div>

           <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleInSlow}
              className="relative z-10 space-y-8"
           >
             <div className="w-24 h-auto mx-auto opacity-70">
                <img src={GUNUNGAN_IMG} alt="Gunungan Icon" />
             </div>

             <div className="space-y-4">
               <motion.h1 variants={fadeUpSlow} className="text-5xl md:text-7xl text-[#F5F5DC] tracking-wide leading-tight drop-shadow-md">
                 {data.couple.groom.firstName}
               </motion.h1>
               <motion.p variants={fadeUpSlow} className="text-2xl text-[#D4AF37] italic font-light">kaliyan</motion.p>
               <motion.h1 variants={fadeUpSlow} className="text-5xl md:text-7xl text-[#F5F5DC] tracking-wide leading-tight drop-shadow-md">
                 {data.couple.bride.firstName}
               </motion.h1>
             </div>

             <motion.div variants={fadeUpSlow} className="pt-10">
                <div className="inline-block border-y-2 border-[#D4AF37] py-2 px-8">
                   <p className="text-lg tracking-[0.2em] text-[#E5C987] uppercase">{formatDate(data.event.date)}</p>
                </div>
             </motion.div>
           </motion.div>
        </div>

        {/* QUOTE SECTION */}
        <div className="py-24 px-8 text-center relative">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpSlow}
              className="max-w-2xl mx-auto bg-[#3E2B20] p-10 rounded-xl border border-[#5C4030] shadow-2xl relative"
            >
                {/* Decorative Batik Frame inside Card */}
                <div className="absolute inset-2 border border-[#D4AF37] opacity-30 rounded-lg pointer-events-none"></div>

                <p className="text-lg md:text-xl font-light leading-loose text-[#F5F5DC] italic">
                  "{data.content.quote}"
                </p>
                <div className="mt-8 flex justify-center">
                   <div className="w-16 h-1 bg-[#D4AF37] rounded-full"></div>
                </div>
                <p className="mt-4 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                  {data.content.quoteSource}
                </p>
            </motion.div>
        </div>
        
        {/* COUPLE SECTION */}
        <div className="py-20 px-6 relative">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-16 text-center">
             
             {/* Pria */}
             <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:1.5 }} className="space-y-6">
               <div className="relative">
                 <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-xl opacity-20"></div>
                 <div className="w-48 h-48 mx-auto rounded-full bg-[#1A110D] border-4 border-[#D4AF37] flex items-center justify-center overflow-hidden shadow-2xl relative z-10">
                   <span className="text-6xl text-[#5C4030] font-serif">P</span>
                 </div>
               </div>
               <div>
                  <h3 className="text-3xl text-[#F5F5DC] tracking-wide">{data.couple.groom.fullName}</h3>
                  <p className="text-sm text-[#AA9988] mt-3 italic">Putra Bpk/Ibu<br/><span className="text-[#E5C987] not-italic">{data.couple.groom.parents}</span></p>
               </div>
             </motion.div>

             {/* Dan */}
             <div className="text-4xl text-[#D4AF37] font-serif italic">&</div>
             
             {/* Wanita */}
             <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:1.5 }} className="space-y-6">
               <div className="relative">
                 <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-xl opacity-20"></div>
                 <div className="w-48 h-48 mx-auto rounded-full bg-[#1A110D] border-4 border-[#D4AF37] flex items-center justify-center overflow-hidden shadow-2xl relative z-10">
                   <span className="text-6xl text-[#5C4030] font-serif">W</span>
                 </div>
               </div>
               <div>
                  <h3 className="text-3xl text-[#F5F5DC] tracking-wide">{data.couple.bride.fullName}</h3>
                  <p className="text-sm text-[#AA9988] mt-3 italic">Putri Bpk/Ibu<br/><span className="text-[#E5C987] not-italic">{data.couple.bride.parents}</span></p>
               </div>
             </motion.div>
          </div>
        </div>
        
        {/* EVENT DETAILS */}
        <div className="py-16 px-6 text-center relative">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleInSlow}
             className="max-w-xl mx-auto bg-[#231711]/90 p-12 rounded-t-[100px] rounded-b-[20px] border-2 border-[#D4AF37]/50 shadow-2xl"
           >
              <h2 className="text-2xl text-[#D4AF37] mb-10 uppercase tracking-[0.2em] border-b border-[#D4AF37]/30 pb-4 inline-block">Wanci & Papan</h2>
              
              <div className="space-y-10">
                <div className="flex flex-col items-center">
                  <Calendar className="w-8 h-8 text-[#D4AF37] mb-4 opacity-80" />
                  <p className="text-3xl text-[#F5F5DC] mb-2">{formatDate(data.event.date)}</p>
                  <p className="text-lg text-[#AA9988] italic">{data.event.timeStart} - {data.event.timeEnd} WIB</p>
                </div>
                
                <div className="w-24 h-[1px] bg-[#D4AF37]/30 mx-auto"></div>

                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-[#D4AF37] mb-4 opacity-80" />
                  <p className="text-2xl text-[#F5F5DC] mb-2">{data.event.locationName}</p>
                  <p className="text-sm text-[#AA9988] px-8 leading-relaxed mb-6">{data.event.address}</p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.event.locationName)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block px-8 py-3 bg-[#D4AF37] text-[#2C1E16] rounded-full text-xs font-bold hover:bg-[#B89628] transition-colors uppercase tracking-widest shadow-lg"
                  >
                    Tunjuk Arah
                  </a>
                </div>
              </div>
           </motion.div>
        </div>

        {/* GALLERY */}
        {(data.images.gallery1 || data.images.gallery2) && (
          <div className="py-24 px-6 text-center">
             <div className="flex items-center justify-center gap-4 mb-12 opacity-60">
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <h2 className="text-sm font-serif text-[#D4AF37] uppercase tracking-[0.3em]">Momen Bahagia</h2>
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {data.images.gallery1 && (
                <div className="p-2 bg-[#D4AF37] rounded-lg shadow-xl rotate-1 hover:rotate-0 transition-transform duration-700">
                   <div className="bg-black overflow-hidden">
                      <img src={data.images.gallery1} className="w-full aspect-[4/5] object-cover opacity-90 hover:opacity-100 transition-opacity" alt="Gallery 1" />
                   </div>
                </div>
              )}
              {data.images.gallery2 && (
                <div className="p-2 bg-[#D4AF37] rounded-lg shadow-xl -rotate-1 hover:rotate-0 transition-transform duration-700">
                   <div className="bg-black overflow-hidden">
                      <img src={data.images.gallery2} className="w-full aspect-[4/5] object-cover opacity-90 hover:opacity-100 transition-opacity" alt="Gallery 2" />
                   </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="pt-20 pb-10 text-center opacity-50">
          <img src={GUNUNGAN_IMG} alt="Gunungan" className="w-16 h-auto mx-auto mb-4 grayscale brightness-50" />
          <p className="text-[10px] text-[#E5C987] tracking-widest uppercase">Matur Nuwun</p>
        </div>

      </div>

      {/* --- FLOATING AUDIO BUTTON --- */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[90]">
          <button 
            onClick={toggleAudio}
            className={`w-14 h-14 flex items-center justify-center rounded-full bg-[#4A3728] border-2 border-[#D4AF37] text-[#D4AF37] shadow-xl transition-all hover:scale-105 active:scale-95 ${isPlaying ? 'animate-spin-slow' : ''}`}
          >
             {isPlaying ? <Music className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
        </div>
      )}

    </div>
  );
}
