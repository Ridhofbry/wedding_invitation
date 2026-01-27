"use client";

import React, { useState } from 'react';
import { 
  LayoutTemplate, User, Clock, Share2, 
  Loader2, CheckCircle, X, Copy, ImageIcon, Heart, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// Local Components & Libs
import ImageUpload from './ImageUpload';
import { useInvitationStore } from '@/components/providers/InvitationContext';
import { supabase } from '@/lib/supabaseClient';

export default function Sidebar() {
  const { 
    data, setSelectedTheme, updateGuest, updateCouple, 
    updateEvent, updateContent, updateImage, removeImage 
  } = useInvitationStore();

  const [isPublishing, setIsPublishing] = useState(false);
  const [toast, setToast] = useState<{show: boolean, link: string}>({ show: false, link: '' });

  // --- SAVE FUNCTION ---
  const handlePublish = async () => {
    setIsPublishing(true);
    
    const groom = data.couple.groom.firstName || 'groom';
    const bride = data.couple.bride.firstName || 'bride';
    const year = new Date(data.event.date).getFullYear() || '2025';
    const slug = `${groom}-${bride}-${year}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const invitationPayload = {
      ...data,
      publishedAt: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('invitations')
        .upsert({ slug: slug, content: invitationPayload }, { onConflict: 'slug' });

      if (error) throw error;

      // Ambil domain otomatis
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://undangan.com';
      setToast({ show: true, link: `${origin}/u/${slug}` });

    } catch (err: any) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(toast.link);
    alert("Link tersalin!");
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto bg-slate-50 border-r border-slate-200">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-6 left-6 z-50 w-80 bg-slate-900 text-white p-4 rounded-lg shadow-2xl"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-green-400 font-medium">
                <CheckCircle className="w-4 h-4" /> Tersimpan!
              </div>
              <button onClick={() => setToast({ show: false, link: '' })}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 p-2 rounded border border-slate-700">
              <code className="text-[10px] text-slate-300 truncate flex-1">{toast.link}</code>
              <button onClick={copyToClipboard}><Copy className="w-3 h-3 text-slate-400 hover:text-white" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Editor</h2>
        <p className="text-slate-500 text-sm">Custom undangan pernikahanmu.</p>
      </div>

      {/* 1. Theme Selection */}
      <Card className="border-l-4 border-l-blue-600 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-blue-600" /> Tema Desain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={data.selectedTheme} 
            onValueChange={(val) => setSelectedTheme(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Tema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elegant">✨ Elegant Gold (Premium)</SelectItem>
              <SelectItem value="rustic">🌿 Rustic Leaf (Nature)</SelectItem>
              <SelectItem value="modern">◼️ Modern Clean (Mono)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* 2. Guest Simulation */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" /> Nama Tamu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Simulasi Tampilan</Label>
            <Input 
              value={data.guestName} 
              onChange={(e) => updateGuest(e.target.value)} 
              placeholder="Contoh: Bpk. Jokowi" 
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. Images */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-purple-600" /> Foto & Galeri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUpload label="Cover Utama" currentImage={data.images.cover} onUpload={(f) => updateImage('cover', f)} onRemove={() => removeImage('cover')} />
          <div className="grid grid-cols-2 gap-3">
            <ImageUpload label="Galeri 1" currentImage={data.images.gallery1} onUpload={(f) => updateImage('gallery1', f)} onRemove={() => removeImage('gallery1')} />
            <ImageUpload label="Galeri 2" currentImage={data.images.gallery2} onUpload={(f) => updateImage('gallery2', f)} onRemove={() => removeImage('gallery2')} />
          </div>
        </CardContent>
      </Card>

      {/* 4. Couple Data (SUDAH DIPERBAIKI: ADA ORANG TUA) */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" /> Data Mempelai
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Pria */}
          <div className="space-y-3 border-b pb-4">
            <h4 className="text-sm font-bold text-slate-900">Mempelai Pria</h4>
            <div className="space-y-1">
              <Label>Nama Panggilan</Label>
              <Input value={data.couple.groom.firstName} onChange={(e) => updateCouple('groom', 'firstName', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Nama Lengkap & Gelar</Label>
              <Input value={data.couple.groom.fullName} onChange={(e) => updateCouple('groom', 'fullName', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Nama Orang Tua (Putra dari...)</Label>
              <Input 
                value={data.couple.groom.parents} 
                onChange={(e) => updateCouple('groom', 'parents', e.target.value)} 
                placeholder="Bpk. Fulan & Ibu Fulanah"
              />
            </div>
          </div>

          {/* Wanita */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Mempelai Wanita</h4>
            <div className="space-y-1">
              <Label>Nama Panggilan</Label>
              <Input value={data.couple.bride.firstName} onChange={(e) => updateCouple('bride', 'firstName', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Nama Lengkap & Gelar</Label>
              <Input value={data.couple.bride.fullName} onChange={(e) => updateCouple('bride', 'fullName', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Nama Orang Tua (Putri dari...)</Label>
              <Input 
                value={data.couple.bride.parents} 
                onChange={(e) => updateCouple('bride', 'parents', e.target.value)} 
                placeholder="Bpk. Fulan & Ibu Fulanah"
              />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* 5. Event Data */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" /> Waktu & Tempat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Tanggal Acara</Label>
            <Input type="date" value={data.event.date} onChange={(e) => updateEvent('date', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Mulai</Label>
              <Input type="time" value={data.event.timeStart} onChange={(e) => updateEvent('timeStart', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Selesai</Label>
              <Input type="time" value={data.event.timeEnd} onChange={(e) => updateEvent('timeEnd', e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Lokasi / Gedung</Label>
            <Input value={data.event.locationName} onChange={(e) => updateEvent('locationName', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Alamat Lengkap</Label>
            <Input value={data.event.address} onChange={(e) => updateEvent('address', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* 6. Kutipan & Doa (BAGIAN BARU INI PENTING) */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-green-500" /> Kutipan & Doa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Salam Pembuka</Label>
            <Input 
              value={data.content.greeting} 
              onChange={(e) => updateContent('greeting', e.target.value)} 
              placeholder="Assalamu'alaikum Wr. Wb."
            />
          </div>
          <div className="space-y-1">
            <Label>Isi Kutipan / Ayat</Label>
            <Input 
              value={data.content.quote} 
              onChange={(e) => updateContent('quote', e.target.value)} 
              placeholder="Dan di antara tanda-tanda..."
            />
          </div>
          <div className="space-y-1">
            <Label>Sumber Kutipan</Label>
            <Input 
              value={data.content.quoteSource} 
              onChange={(e) => updateContent('quoteSource', e.target.value)} 
              placeholder="QS. Ar-Rum: 21"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="pb-10 pt-4">
        <Button 
          onClick={handlePublish} 
          disabled={isPublishing} 
          className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white"
        >
          {isPublishing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
          ) : (
            <><Share2 className="mr-2 h-4 w-4" /> Simpan & Publish</>
          )}
        </Button>
      </div>

    </div>
  );
}
