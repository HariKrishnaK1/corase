"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Truck, RefreshCw, Shield, Zap, ArrowRight, ChevronRight, Tag, Clock, Heart } from "lucide-react";
import Hero from "@/components/home/Hero";
import ProductRotation from "@/components/home/ProductRotation";
import ProductModal from "@/components/products/ProductModal";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { Product } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// Fallback products shown when DB is unreachable
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "1", name: "CYBERPUNK MECHA TEE", price: 85,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/cyber-tee",
    description: "Jet black heavy cotton oversized tee.", color: "#FF9F43",
    variants: [{ size: "S", stock: 10 }, { size: "M", stock: 10 }, { size: "L", stock: 10 }, { size: "XL", stock: 10 }],
    sizes: ["S", "M", "L", "XL"], isNewDrop: true, isFeatured: true,
  },
  {
    id: "2", name: "ACID WASH GOTHIC TEE", price: 75,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/acid-tee",
    description: "Acid wash dark grey/charcoal color.", color: "#FF9F43",
    variants: [{ size: "M", stock: 10 }, { size: "L", stock: 10 }, { size: "XL", stock: 5 }],
    sizes: ["M", "L", "XL"], isNewDrop: true, isFeatured: true,
  },
  {
    id: "3", name: "NEON OVERLOAD", price: 75,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/neon-tee",
    description: "Neon accented streets tee.", color: "#FF9F43",
    variants: [{ size: "S", stock: 2 }, { size: "M", stock: 2 }, { size: "L", stock: 2 }],
    sizes: ["S", "M", "L"], isNewDrop: true, isFeatured: false,
  },
  {
    id: "4", name: "VOID TEE", price: 65,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/void-tee",
    description: "Dark minimalist core tee.", color: "#FF9F43",
    variants: [{ size: "M", stock: 10 }, { size: "L", stock: 10 }, { size: "XL", stock: 10 }],
    sizes: ["M", "L", "XL"], isNewDrop: true, isFeatured: false,
  },
  {
    id: "5", name: "ARCHIVE DISTRESSED", price: 90,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/archive-tee",
    description: "Vintage distressed archive tee.", color: "#FF9F43",
    variants: [{ size: "S", stock: 10 }, { size: "M", stock: 10 }, { size: "L", stock: 10 }],
    sizes: ["S", "M", "L"], isNewDrop: false, isFeatured: false,
  },
  {
    id: "6", name: "LINEAR LOGO TEE", price: 55,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/cyber-tee",
    description: "Horizontal stretched brand logo across the chest.", color: "#FF9F43",
    variants: [{ size: "M", stock: 10 }, { size: "L", stock: 10 }, { size: "XL", stock: 10 }],
    sizes: ["M", "L", "XL"], isNewDrop: false, isFeatured: false,
  },
];

const TRUST_BADGES = [
  { icon: Truck,     title: "Free Delivery",    sub: "On orders above ₹999",        accent: "#FF9F43" },
  { icon: RefreshCw, title: "Easy Returns",     sub: "7-day hassle-free returns",    accent: "#34d399" },
  { icon: Shield,    title: "Secure Payment",   sub: "100% safe & encrypted",        accent: "#818cf8" },
  { icon: Zap,       title: "Fast Dispatch",    sub: "Ships within 24 hours",        accent: "#f472b6" },
];

const CATEGORIES = [
  { label: "Oversized",  emoji: "👕", href: "/shop?filter=oversized", bg: "from-orange-900/80 to-orange-700/80",  border: "border-orange-500/30" },
  { label: "Graphic",    emoji: "🎨", href: "/shop?filter=graphic",   bg: "from-purple-900/80 to-purple-700/80",  border: "border-purple-500/30" },
  { label: "Acid Wash",  emoji: "🫧", href: "/shop?filter=acidwash",  bg: "from-slate-800/80 to-slate-600/80",    border: "border-slate-500/30" },
  { label: "New Drops",  emoji: "⚡", href: "/shop?filter=new",       bg: "from-yellow-800/80 to-yellow-600/80",  border: "border-yellow-500/30" },
  { label: "Archive",    emoji: "🗄️", href: "/collections",           bg: "from-zinc-800/80 to-zinc-600/80",      border: "border-zinc-500/30" },
  { label: "All Tees",   emoji: "🛍️", href: "/shop",                  bg: "from-red-900/80 to-red-700/80",        border: "border-red-500/30" },
];

const TESTIMONIALS = [
  { name: "Arjun M.", location: "Mumbai",    rating: 5, text: "Best quality tees I've ever owned. The heavyweight cotton is absolutely insane — worth every single rupee. The fit is perfect.", tag: "Verified Buyer" },
  { name: "Priya S.", location: "Bangalore", rating: 5, text: "CORASE is unlike anything else in the market. The graphics are so unique, the fabric is premium, and the fit is perfect.", tag: "Verified Buyer" },
  { name: "Rohit D.", location: "Delhi",     rating: 5, text: "Ordered the Cyberpunk Mecha Tee and it looks even better in person. The packaging was premium and shipping was super fast!", tag: "Verified Buyer" },
  { name: "Sneha R.", location: "Chennai",   rating: 5, text: "Finally a brand that takes quality seriously. The Acid Wash Gothic Tee washes beautifully and just looks better with time.", tag: "Verified Buyer" },
  { name: "Karan N.", location: "Hyderabad", rating: 5, text: "Every piece feels limited edition. The attention to detail is unmatched. I get compliments every time I wear CORASE.", tag: "Verified Buyer" },
  { name: "Meera K.", location: "Pune",      rating: 5, text: "The Neon Overload tee is an absolute head-turner. Amazing quality and it arrived in 2 days. Will order again!", tag: "Verified Buyer" },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

// ── Product Card ──────────────────────────────────────────────────
function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <span className="text-6xl mb-3">👕</span>
            <span className="text-sm text-gray-400 font-medium">Coming Soon</span>
          </div>
        ) : (
          <Image
            src={product.image} alt={product.name} fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        {product.isNewDrop && (
          <span className="absolute top-4 left-4 bg-[#FF9F43] text-black text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
            New
          </span>
        )}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            wishlisted ? "bg-red-500 text-white scale-110" : "bg-white/90 text-gray-400 hover:text-red-500 hover:scale-110"
          }`}
        >
          <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-black text-white py-3.5 text-center text-sm font-black tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Quick View
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">CORASE</p>
        <h3 className="text-base font-bold text-gray-900 truncate mb-3">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-gray-900">${product.price}</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#FF9F43" className="text-[#FF9F43]" />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Upcoming Card (teaser with hover tshirt reveal) ──────────────
function UpcomingCard({ name, price, eta }: { name: string; price: number; eta: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-[#111] border border-white/[0.08] rounded-2xl overflow-hidden cursor-pointer hover:border-[#FF9F43]/30 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden">
        {/* Blurred tshirt revealed on hover */}
        <div className={`absolute inset-0 transition-all duration-500 ${hovered ? 'opacity-100 blur-[2px] scale-105' : 'opacity-0 blur-[12px] scale-100'}`}>
          <Image
            src="https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_400/corase/products/cyber-tee"
            alt="Coming soon tshirt"
            fill
            sizes="33vw"
            className="object-contain p-8"
          />
        </div>

        {/* Lock icon — fades out on hover */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${hovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
          <div className="w-24 h-24 rounded-full bg-[#FF9F43]/10 flex items-center justify-center border border-[#FF9F43]/20">
            <span className="text-4xl">🔒</span>
          </div>
        </div>

        {/* Dark overlay always */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hover peek label */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs font-black text-white bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full uppercase tracking-widest">Sneak Peek</span>
        </div>

        {/* ETA label */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-3 px-4 text-center">
          <span className="text-xs font-black text-[#FF9F43] tracking-widest uppercase">Dropping {eta}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-1">CORASE</p>
        <h3 className="text-sm font-bold text-white/55 truncate mb-3">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-base font-black text-white/35">${price}</span>
          <button className="text-xs font-bold text-[#FF9F43] bg-[#FF9F43]/10 border border-[#FF9F43]/20 px-3 py-1 rounded-full uppercase tracking-wide hover:bg-[#FF9F43]/20 transition-all">
            Notify
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const featuredProducts = allProducts.filter(p => p.isFeatured).slice(0, 2);
  // Always show 4 — fill with non-duplicate products if fewer than 4 are marked isNewDrop
  const newDropFiltered = allProducts.filter(p => p.isNewDrop);
  const newDrops = newDropFiltered.length >= 4
    ? newDropFiltered.slice(0, 4)
    : [...newDropFiltered, ...allProducts.filter(p => !newDropFiltered.includes(p))].slice(0, 4);

  useEffect(() => {
    async function load() {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 5000);
        const res = await fetch("/api/products", { signal: ctrl.signal });
        clearTimeout(t);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setAllProducts(data);
        }
      } catch { /* use fallback */ }
    }
    load();
  }, []);

  const rotationProducts = featuredProducts.length >= 2 ? featuredProducts : allProducts.slice(0, 2);

  return (
    <>
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loadingComplete ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white"
      >
        {/* ══ 1. HERO ══════════════════════════════════════════════ */}
        <section className="h-screen bg-[#FF9F43]">
          <Hero />
        </section>

        {/* ══ 2. TRUST BADGES ════════════════════════════════════ */}
        <section className="bg-[#161616] py-28 px-5 lg:px-16">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-xs font-black text-[#FF9F43] tracking-[0.5em] uppercase mb-4">Why CORASE</p>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syncopate text-white uppercase tracking-tight">
                We Got You Covered
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_BADGES.map(({ icon: Icon, title, sub, accent }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.5 }}
                  className="flex flex-col items-center text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-300 group"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${accent}18` }}
                  >
                    <Icon size={28} style={{ color: accent }} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/40 font-medium leading-relaxed">{sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3. PRODUCT ROTATION ══════════════════════════════════ */}
        <section className="bg-[#FF9F43]">
          <ProductRotation
            products={rotationProducts}
            onSelectProduct={p => setSelectedProduct(p)}
          />
        </section>

        {/* ══ 4. SHOP CATEGORIES ════════════════════════════════ */}
        <section className="bg-[#111] py-24 px-5 lg:px-16">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-black text-[#FF9F43] tracking-[0.5em] uppercase mb-4">Browse by Style</p>
              <h2 className="text-3xl sm:text-5xl font-black font-syncopate text-white uppercase tracking-tight mb-3">
                Shop Categories
              </h2>
              <p className="text-white/35 text-base font-medium">Find your perfect style from our curated collections</p>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-5">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link href={cat.href}>
                    <div className={`bg-gradient-to-b ${cat.bg} border ${cat.border} rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:scale-[1.06] hover:shadow-lg transition-all duration-300 aspect-square cursor-pointer`}>
                      <span className="text-3xl sm:text-4xl">{cat.emoji}</span>
                      <span className="text-xs sm:text-sm font-bold text-white/90 text-center leading-tight">{cat.label}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-white/40 font-bold hover:text-white transition-colors">
                View All Products <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ 5. NEW ARRIVALS — full page ══════════════════════════ */}
        <section className="min-h-screen bg-white flex items-center py-28 px-5 lg:px-16">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-sm font-black text-[#FF9F43] tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-2">
                <Zap size={14} /> Just Dropped
              </p>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syncopate text-gray-900 uppercase tracking-tight leading-none mb-4">
                New Arrivals
              </h2>
              <p className="text-gray-400 text-lg font-medium">Fresh off the press. Limited stock.</p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {(newDrops.length > 0 ? newDrops : allProducts.slice(0, 4)).map(p => (
                <ProductCard key={p.id} product={p} onSelect={p => setSelectedProduct(p)} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/shop?filter=new" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-gray-700 transition-all duration-300">
                View All New Drops <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ 6. OFFER BANNER ════════════════════════════════════ */}
        <section className="bg-[#FF9F43] py-24 px-5">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 bg-black/20 rounded-full px-5 py-2 mb-8">
                <Tag size={15} className="text-white" />
                <span className="text-sm font-black text-white uppercase tracking-widest">Limited Time Offer</span>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-syncopate text-white uppercase tracking-tight leading-none mb-6">
                First Order<br />15% Off
              </h2>
              <p className="text-lg text-white/70 font-medium mb-6">
                Use code at checkout to claim your discount
              </p>
              <div className="inline-block bg-black/25 border-2 border-white/30 rounded-2xl px-8 py-4 mb-10">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-[0.3em]">CORASE15</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop" className="bg-black text-white px-10 py-4 rounded-2xl font-black text-base tracking-widest uppercase hover:bg-gray-900 transition-all duration-300">
                  Shop Now
                </Link>
                <Link href="/collections" className="bg-white/20 border-2 border-white/40 text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-white/30 transition-all duration-300">
                  Browse All
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 7. UPCOMING DROPS ══════════════════════════════════ */}
        <section className="bg-[#0a0a0a] py-28 px-5 lg:px-16">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-xs font-black text-[#FF9F43] tracking-[0.5em] uppercase mb-4 flex items-center justify-center gap-2">
                <Clock size={12} /> Coming Soon
              </p>
              <h2 className="text-3xl sm:text-5xl font-black font-syncopate text-white uppercase tracking-tight mb-3">
                Upcoming Drops
              </h2>
              <p className="text-white/35 text-base font-medium">Hover to get a sneak peek — be the first to know</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <UpcomingCard name="BRUTAL CORE TEE" price={95} eta="May 2026" />
              <UpcomingCard name="PHANTOM DROP 01" price={110} eta="May 2026" />
              <UpcomingCard name="CHROME SERIAL 02" price={85} eta="Jun 2026" />
              <UpcomingCard name="GLITCH EDITION" price={100} eta="Jun 2026" />
              <UpcomingCard name="SMOKE & MIRROR" price={90} eta="Jul 2026" />
              <UpcomingCard name="ARCHIVE VOL. 2" price={120} eta="Jul 2026" />
            </div>
          </div>
        </section>

        {/* ══ 8. TESTIMONIALS — full page ══════════════════════════ */}
        <section className="min-h-screen bg-[#0d0d0d] flex items-center py-28 px-5 lg:px-16">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-sm font-black text-[#FF9F43] tracking-[0.4em] uppercase mb-4">Social Proof</p>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syncopate text-white uppercase tracking-tight leading-none">
                What Customers<br />Say
              </h2>
              <div className="flex items-center justify-center gap-2 mt-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="#FF9F43" className="text-[#FF9F43]" />)}
                <span className="text-lg text-white/50 font-bold ml-2">4.9 / 5.0</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 flex flex-col hover:border-white/[0.15] transition-all duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#FF9F43" className="text-[#FF9F43]" />)}
                  </div>
                  <p className="text-white/65 text-base font-medium leading-relaxed mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div>
                      <p className="text-white font-bold text-base">{t.name}</p>
                      <p className="text-white/30 text-sm font-medium">{t.location}</p>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">{t.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 9. FINAL CTA ════════════════════════════════════════ */}
        <section className="bg-[#FF9F43] py-32 px-5 text-center">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <p className="text-xs font-black text-white/60 tracking-[0.5em] uppercase mb-6">The Archive Awaits</p>
            <h2 className="text-4xl sm:text-6xl font-black font-syncopate text-white uppercase tracking-tight leading-none mb-6">
              Wear the<br />Difference
            </h2>
            <p className="text-lg text-white/65 font-medium mb-12 leading-relaxed">
              Limited drops. Archive quality.<br />No compromises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="bg-black text-white px-10 py-4 rounded-2xl font-black text-base tracking-widest uppercase hover:bg-gray-900 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
                Shop Now
              </Link>
              <Link href="/about" className="bg-white/20 border-2 border-white/40 text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-white/30 transition-all duration-300">
                Our Story
              </Link>
            </div>
          </motion.div>
        </section>
      </motion.div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
