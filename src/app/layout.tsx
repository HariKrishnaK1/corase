import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import SiteShell from "@/components/layout/SiteShell";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "CORASE | RITUAL Streetwear",
  description: "Limited-drop premium streetwear for the bold and the restless. Archive quality, cinematic design.",
  keywords: ["streetwear", "premium tees", "limited drops", "CORASE", "RITUAL"],
  openGraph: {
    title: "CORASE | RITUAL Streetwear",
    description: "Limited-drop premium streetwear for the bold and the restless.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="antialiased">
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
