import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Menggunakan font Google standar
import "./globals.css"; // PENTING: Ini memanggil Tailwind CSS kamu

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wedding Invitation Builder",
  description: "Buat undangan pernikahan digitalmu sendiri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
