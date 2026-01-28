import { supabase } from "@/lib/supabaseClient";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- [PENTING] CODE ANTI-CACHE ---
// Baris ini memaksa Vercel untuk SELALU mengambil data terbaru dari Supabase.
// Tanpa ini, kalau kamu ganti tema, Vercel akan tetap menampilkan tema lama (cache).
export const revalidate = 0;
export const dynamic = 'force-dynamic';

// --- FITUR SEO ---
// Judul tab browser akan otomatis berubah sesuai nama pengantin
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = await supabase
    .from("invitations")
    .select("content")
    .eq("slug", params.slug)
    .single();

  if (!data) return { title: "Undangan Tidak Ditemukan" };

  const { groom, bride } = data.content.couple;
  return {
    title: `The Wedding of ${groom.firstName} & ${bride.firstName}`,
    description: `Kami mengundang Anda untuk hadir di pernikahan kami.`,
  };
}

// --- HALAMAN UTAMA ---
export default async function GuestPage({ params }: { params: { slug: string } }) {
  // 1. Ambil data undangan dari Supabase berdasarkan SLUG di URL
  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("content")
    .eq("slug", params.slug)
    .single();

  // 2. Jika data tidak ketemu atau error, tampilkan halaman 404
  if (error || !invitation) {
    notFound();
  }

  // 3. Render Undangan
  // Kita kirim data ke 'TemplateRenderer' yang akan memilihkan desain (Jawa/Modern/dll)
  return (
    <main className="w-full min-h-screen bg-slate-50">
      <TemplateRenderer data={invitation.content} />
    </main>
  );
}
