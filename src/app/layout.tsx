import type { Metadata } from "next";
import { Outfit, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Portfolio of Yusuf Bektas, game developer building game recall & compliance audit systems for cabinet video slots. 40+ Unity mobile projects, native iOS/Android, web and AI-first workflows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://agolho.github.io"),
  title: "Yusuf Bektas | Game Developer",
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Yusuf Bektas",
    title: "Yusuf Bektas | Game Developer",
    description,
    images: [{ url: "/avatarCasino.png", width: 512, height: 512, alt: "Yusuf Bektas" }],
  },
  twitter: {
    card: "summary",
    title: "Yusuf Bektas | Game Developer",
    description,
    images: ["/avatarCasino.png"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>♠️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-slate-950 text-slate-100 font-sans`}
      >
        <div className="min-h-screen flex flex-col items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
