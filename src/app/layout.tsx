import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agolho | Senior Game Developer",
  description: "Portfolio of Agolho - Senior Game & Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 font-sans`}
      >
        <div className="min-h-screen flex flex-col items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
