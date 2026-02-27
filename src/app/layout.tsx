import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "VibeHub | AI Promptai ir Įrankiai",
  description: "Mini-platforma programuotojams kaupti ir dalintis AI promptais bei įrankiais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <body className="antialiased overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
