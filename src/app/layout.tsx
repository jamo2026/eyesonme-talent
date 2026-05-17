import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EyesOnMe Talent – Menschen verbinden.",
  description: "Wir verbinden IT-Profis und Handwerker direkt mit Unternehmen. Persönlich. Transparent. Ohne Vermittler.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`h-full ${dmSerif.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
