import React from 'react';
import { Camera, Trash2, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
  label: string;
  currentImage: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export default function ImageUpload({ label, currentImage, onUpload, onRemove }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {currentImage ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-200 group bg-slate-100">
          <img 
            src={currentImage} 
            alt="Preview" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <label className="cursor-pointer p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors ring-1 ring-white/50">
              <Camera className="w-4 h-4" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} 
              />
            </label>
            <button 
              onClick={onRemove} 
              className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors ring-1 ring-red-400/50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="group relative w-full h-32 rounded-lg border-2 border-dashed border-slate-300 hover:border-slate-800 hover:bg-slate-50 transition-all flex flex-col items-center justify-center cursor-pointer bg-slate-50/50">
          <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform border border-slate-100">
            <Upload className="w-5 h-5 text-slate-400 group-hover:text-slate-800" />
          </div>
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-800">Klik untuk upload</span>
          <span className="text-[10px] text-slate-400 mt-1">Maks. 2MB</span>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} 
          />
        </label>
      )}
    </div>
  );
}
