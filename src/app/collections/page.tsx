"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/context/CartContext';
import Image from 'next/image';
import ProductModal from '@/components/products/ProductModal';
import { Plus, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';

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

const CollectionsPage = () => {
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
                if (Array.isArray(data) && data.length > 0) setDbProducts(data);
                // else keep FALLBACK
            } catch {
                // silently fail — spinner shows below
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="bg-black min-h-screen pt-40 pb-32 px-6 lg:px-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#FF9F43] rounded-full blur-[200px] opacity-5 pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center space-x-4 mb-5">
                        <span className="w-12 h-px bg-[#FF9F43]" />
                        <span className="text-[10px] font-black tracking-[0.5em] text-[#FF9F43] uppercase">CORASE 2026</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-6xl md:text-9xl font-bold font-syncopate tracking-tighter text-white leading-none uppercase italic"
                    >
                        THE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF9F43] to-white/30">ARCHIVE</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-5 text-white/30 font-bold tracking-[0.2em] uppercase text-xs max-w-md">
                        {dbProducts.length} designs. Premium streetwear. Limited stock.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                    {dbProducts.map((product, index) => {
                        const wishlisted = isWishlisted(product.id);
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group cursor-pointer"
                                onMouseEnter={() => setHoveredId(product.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div
                                    className={cn(
                                        "relative aspect-square bg-white/5 rounded-2xl overflow-hidden mb-3 border transition-all duration-500",
                                        hoveredId === product.id
                                            ? "border-[#FF9F43]/40 shadow-[0_20px_50px_rgba(255,159,67,0.12)]"
                                            : "border-white/5"
                                    )}
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    {/* Badges */}
                                    {product.isFeatured && (
                                        <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-1 bg-[#FF9F43] px-2 py-0.5 rounded-full">
                                            <Star size={7} fill="black" className="text-black" />
                                            <span className="text-[7px] font-black text-black tracking-widest uppercase">Featured</span>
                                        </div>
                                    )}
                                    {product.isNewDrop && (
                                        <div className={cn("absolute z-10 bg-[#e6ff00] px-2 py-0.5 rounded-full", product.isFeatured ? "top-2.5 right-2.5" : "top-2.5 right-2.5")}>
                                            <span className="text-[7px] font-black text-black tracking-widest uppercase">New</span>
                                        </div>
                                    )}

                                    {/* Wishlist heart */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image }); }}
                                        className={cn(
                                            "absolute bottom-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-300",
                                            wishlisted ? "bg-red-500 text-white" : "bg-black/50 text-white/50 opacity-0 group-hover:opacity-100 hover:text-red-400"
                                        )}
                                    >
                                        <Heart size={13} fill={wishlisted ? "white" : "none"} />
                                    </button>

                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        className={cn(
                                            "object-contain p-5 transition-all duration-500",
                                            hoveredId === product.id ? "scale-108" : "scale-100"
                                        )}
                                        loading={index < 6 ? "eager" : "lazy"}
                                    />

                                    {/* Quick add */}
                                    <div className={cn(
                                        "absolute inset-x-0 bottom-8 flex justify-center transition-all duration-400",
                                        hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                                    )}>
                                        <div className="bg-[#FF9F43] text-black p-2.5 rounded-full shadow-lg">
                                            <Plus size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="px-0.5">
                                    <h3 className={cn(
                                        "text-[11px] font-black font-syncopate tracking-tight uppercase leading-tight mb-1 transition-colors duration-200",
                                        hoveredId === product.id ? "text-[#FF9F43]" : "text-white/75"
                                    )}>
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-white/30 font-bold">${product.price}</p>
                                        {/* Star rating (static display) */}
                                        <div className="flex items-center space-x-0.5">
                                            {[1,2,3,4,5].map(s => (
                                                <Star key={s} size={9} fill={s <= 4 ? "#FF9F43" : "none"} className={s <= 4 ? "text-[#FF9F43]" : "text-white/20"} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {isLoading && (
                    <div className="py-40 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-2 border-white/20 border-t-[#FF9F43] rounded-full animate-spin mx-auto mb-5" />
                        <p className="text-white/20 font-black tracking-[0.5em] text-xs uppercase">Loading Collection...</p>
                    </div>
                )}

                {!isLoading && dbProducts.length === 0 && (
                    <div className="py-40 text-center">
                        <div className="w-12 h-12 border-2 border-[#FF9F43]/30 border-t-[#FF9F43] rounded-full animate-spin mx-auto mb-5" />
                        <p className="text-white/20 font-black tracking-[0.5em] text-xs uppercase">Loading Collection...</p>
                    </div>
                )}
            </div>

            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
    );
};

export default CollectionsPage;
