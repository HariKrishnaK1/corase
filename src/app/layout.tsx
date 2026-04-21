import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import SiteShell from "@/components/layout/SiteShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const syncopate = Orbitron({
  weight: ["900"],
  subsets: ["latin"],
  variable: "--font-syncopate",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CORASE | Premium Streetwear",
  description: "Limited-drop premium streetwear for the bold and the restless. Archive quality, cinematic design.",
  keywords: ["streetwear", "premium tees", "limited drops", "CORASE"],
  openGraph: {
    title: "CORASE | Premium Streetwear",
    description: "Limited-drop premium streetwear for the bold and the restless.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable}`}>
      <body className="antialiased bg-[#FF9F43] text-white selection:bg-white selection:text-[#FF9F43] font-sans">
        <WishlistProvider>
          <CartProvider>
            <div className="grain-overlay" />
            <SiteShell>{children}</SiteShell>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
