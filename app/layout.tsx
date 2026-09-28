import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Nunito } from "next/font/google";
import { BottomNav } from "@/components/bottom-nav";
import { CartHydrater } from "@/components/cart-hydrater";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kolo — produits bio et locaux à Abidjan",
    template: "%s · Kolo",
  },
  description:
    "Kolo relie les producteurs du Grand Abidjan aux consommateurs. Légumes, fruits, œufs, miel et volaille en circuit ultra-court.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f6b45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${nunito.variable} ${fraunces.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <CartHydrater />
        {children}
        <BottomNav />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
