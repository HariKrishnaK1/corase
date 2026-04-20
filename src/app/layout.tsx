import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Orbitron } from "next/font/google";

const syncopate = Orbitron({
  weight: ["900"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

export const metadata: Metadata = {
  title: "CORASE | Premium Streetwear",
  description: "Modern, high-end streetwear for the bold.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable}`}>
      <body className="antialiased bg-[#FF9F43] text-white selection:bg-white selection:text-[#FF9F43] font-sans h-full">
        <CartProvider>
          <div className="grain-overlay" />
          <Navbar />
          <CartDrawer />
          <main className="relative min-h-screen">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
