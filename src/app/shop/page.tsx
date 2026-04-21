"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/context/CartContext';
import Image from 'next/image';
import ProductModal from '@/components/products/ProductModal';
import { Plus, Star, Heart, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';

const categories = ['ALL', 'TSHIRTS', 'HOODIES', 'ACCESSORIES'];

const cld = (name: string) =>
    `https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/${name}`;

const FALLBACK: Product[] = [
    { id:'1', name:'CYBERPUNK MECHA TEE', price:85, image:cld('corase/products/cyber-tee'), description:'Jet black oversized tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['S','M','L','XL'], isNewDrop:true, isFeatured:true },
    { id:'2', name:'ACID WASH GOTHIC TEE', price:75, image:cld('corase/products/acid-tee'), description:'Acid wash gothic tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['M','L','XL'], isNewDrop:true, isFeatured:true },
    { id:'3', name:'VOID TEE', price:65, image:cld('corase/products/void-tee'), description:'Minimal void tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['S','M','L','XL'], isNewDrop:false, isFeatured:false },
    { id:'4', name:'NEON OVERLOAD', price:75, image:cld('corase/products/neon-tee'), description:'Neon cyberpunk tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['M','L','XL'], isNewDrop:true, isFeatured:false },
    { id:'5', name:'ARCHIVE 01', price:60, image:cld('corase/products/archive-tee'), description:'Archive distressed tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['S','M','L'], isNewDrop:true, isFeatured:false },
    { id:'6', name:'LINEAR LOGO', price:55, image:cld('corase/products/neon-tee'), description:'Linear logo tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['S','M','L','XL'], isNewDrop:false, isFeatured:false },
    { id:'7', name:'GHOST MASK', price:80, image:cld('corase/products/void-tee'), description:'Ghost mask tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['L','XL'], isNewDrop:false, isFeatured:false },
    { id:'8', name:'NEO TOKYO STREET TEE', price:70, image:cld('corase/products/archive-tee'), description:'Neo tokyo tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['S','M','L'], isNewDrop:false, isFeatured:false },
    { id:'9', name:'VINTAGE WASH 02', price:65, image:cld('corase/products/acid-tee'), description:'Vintage wash tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['M','L','XL'], isNewDrop:false, isFeatured:false },
    { id:'10', name:'ESSENTIAL BLANK', price:45, image:cld('corase/products/cyber-tee'), description:'Essential blank tee.', color:'#FF9F43', variants:[{size:'M',stock:10}], sizes:['S','M','L','XL'], isNewDrop:false, isFeatured:false },
];

const ShopPage = () => {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [dbProducts, setDbProducts] = useState<Product[]>(FALLBACK);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toggleWishlist, isWishlisted } = useWishlist();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 6000);
                const res = await fetch('/api/products', { signal: controller.signal });
                clearTimeout(timeout);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setDbProducts(data);
                }
            } catch {
                // Keep showing fallback
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = (Array.isArray(dbProducts) ? dbProducts : []).filter(p =>
        activeCategory === 'ALL' || (p as any).category?.toUpperCase() === activeCategory || activeCategory === 'TSHIRTS'
    );

    return (
        <div className="bg-black min-h-screen pt-36 pb-32 px-6 lg:px-12 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-[#FF9F43] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[300px] bg-[#FF9F43] rounded-full blur-[180px] opacity-[0.04] pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto relative z-10">

                {/* ── Header ── */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center space-x-4 mb-6"
                    >
                        <span className="w-12 h-px bg-[#FF9F43]" />
                        <span className="text-[10px] font-black tracking-[0.5em] text-[#FF9F43] uppercase">Archival Collection · {filteredProducts.length} Pieces</span>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black font-syncopate tracking-tighter text-white leading-none uppercase"
                        >
                            THE{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9F43] via-[#FFB966] to-[#FF9F43]">
                                SHOP
                            </span>
                        </motion.h1>

                        {/* Filter pills */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center gap-2 flex-wrap"
                        >
                            <SlidersHorizontal size={14} className="text-[#FF9F43] mr-1" />
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl text-[10px] font-black font-syncopate tracking-[0.12em] transition-all duration-300 uppercase border",
                                        activeCategory === cat
                                            ? "bg-[#FF9F43] text-black border-[#FF9F43] shadow-[0_0_20px_rgba(255,159,67,0.35)]"
                                            : "bg-white/[0.04] text-white/40 border-white/[0.08] hover:border-[#FF9F43]/40 hover:text-white hover:bg-white/[0.08]"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Divider line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-10 h-px bg-gradient-to-r from-[#FF9F43]/40 via-white/[0.08] to-transparent origin-left"
                    />
                </div>

                {/* ── Product Grid ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
                    >
                        {filteredProducts.map((product, index) => {
                            const wishlisted = isWishlisted(product.id);
                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.06 }}
                                    className="group cursor-pointer"
                                    onMouseEnter={() => setHoveredId(product.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    {/* Image container */}
                                    <div className={cn(
                                        "relative aspect-[3/4] bg-white/[0.04] rounded-2xl overflow-hidden mb-4 border transition-all duration-500",
                                        hoveredId === product.id
                                            ? "border-[#FF9F43]/50 shadow-[0_20px_60px_rgba(255,159,67,0.15)]"
                                            : "border-white/[0.06]"
                                    )}>
                                        {/* Orange glow on hover */}
                                        <div className={cn(
                                            "absolute inset-0 bg-[#FF9F43] rounded-2xl transition-opacity duration-700 blur-[60px]",
                                            hoveredId === product.id ? "opacity-[0.08]" : "opacity-0"
                                        )} />

                                        {/* Badges */}
                                        {product.isFeatured && (
                                            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[#FF9F43] px-2.5 py-1 rounded-full">
                                                <Star size={8} fill="black" className="text-black" />
                                                <span className="text-[8px] font-black text-black tracking-widest uppercase">Featured</span>
                                            </div>
                                        )}
                                        {product.isNewDrop && (
                                            <div className={cn(
                                                "absolute top-3 z-10 bg-white text-black px-2.5 py-1 rounded-full",
                                                product.isFeatured ? "right-3" : "left-3"
                                            )}>
                                                <span className="text-[8px] font-black tracking-widest uppercase">New</span>
                                            </div>
                                        )}

                                        {/* Wishlist */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image }); }}
                                            className={cn(
                                                "absolute bottom-3 right-3 z-10 p-2 rounded-full transition-all duration-300",
                                                wishlisted
                                                    ? "bg-red-500 text-white"
                                                    : "bg-black/50 backdrop-blur-sm text-white/50 opacity-0 group-hover:opacity-100 hover:text-red-400"
                                            )}
                                        >
                                            <Heart size={14} fill={wishlisted ? "white" : "none"} />
                                        </button>

                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className={cn(
                                                "object-contain p-6 transition-all duration-700",
                                                hoveredId === product.id ? "scale-110" : "scale-100"
                                            )}
                                            loading={index < 8 ? "eager" : "lazy"}
                                        />

                                        {/* Quick view overlay */}
                                        <div className={cn(
                                            "absolute inset-x-0 bottom-0 flex items-center justify-center pb-5 transition-all duration-400",
                                            hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                                        )}>
                                            <div className="bg-[#FF9F43] text-black px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg font-black text-xs tracking-widest uppercase">
                                                <Plus size={14} />
                                                Quick View
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product info */}
                                    <div className="px-1">
                                        <p className="text-[9px] font-black text-[#FF9F43]/60 tracking-[0.4em] uppercase mb-1">
                                            {(product as any).category || 'TSHIRTS'}
                                        </p>
                                        <h3 className={cn(
                                            "text-sm font-black font-syncopate tracking-tight uppercase leading-tight mb-2 transition-colors duration-200",
                                            hoveredId === product.id ? "text-[#FF9F43]" : "text-white/85"
                                        )}>
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-base font-black text-white">
                                                ₹{product.price * 83}
                                                <span className="text-xs text-white/30 font-medium ml-1">(${product.price})</span>
                                            </p>
                                            {/* Stars */}
                                            <div className="flex items-center gap-0.5">
                                                {[1,2,3,4,5].map(s => (
                                                    <Star key={s} size={9} fill={s <= 4 ? "#FF9F43" : "none"} className={s <= 4 ? "text-[#FF9F43]" : "text-white/20"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Loading skeleton shimmer */}
                {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 mt-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[3/4] bg-white/[0.04] rounded-2xl mb-4" />
                                <div className="h-3 bg-white/[0.06] rounded mb-2 w-3/4" />
                                <div className="h-4 bg-white/[0.04] rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && filteredProducts.length === 0 && (
                    <div className="py-40 text-center">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-white/20 font-black tracking-[0.5em] text-xs uppercase">No items in this category</p>
                    </div>
                )}
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default ShopPage;
