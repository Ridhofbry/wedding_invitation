import { supabase } from "@/lib/supabaseClient";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- PERBAIKAN UTAMA: MATIKAN CACHE ---
// Ini memaksa Vercel untuk selalu mengambil data terbaru dari Supabase setiap kali link dibuka.
export const revalidate = 0;
export const dynamic = 'force-dynamic';

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

export default async function GuestPage({ params }: { params: { slug: string } }) {
  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("content")
    .eq("slug", params.slug)
    .single();

  if (error || !invitation) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-slate-50">
      <TemplateRenderer data={invitation.content} />
    </main>
  );
}
