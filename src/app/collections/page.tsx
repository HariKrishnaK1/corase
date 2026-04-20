"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/context/CartContext';
import Image from 'next/image';
import ProductModal from '@/components/products/ProductModal';
import { Plus, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const CollectionsPage = () => {
    const [dbProducts, setDbProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setDbProducts(data);
            } catch (err) {
                console.error('Failed to load products', err);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="bg-black min-h-screen pt-40 pb-32 px-6 lg:px-12 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#FF9F43] rounded-full blur-[200px] opacity-5 pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center space-x-4 mb-6"
                    >
                        <span className="w-12 h-px bg-[#FF9F43]" />
                        <span className="text-[10px] font-black tracking-[0.5em] text-[#FF9F43] uppercase">
                            CORASE 2026
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-9xl font-bold font-syncopate tracking-tighter text-white leading-none uppercase italic"
                    >
                        THE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF9F43] to-white/30">
                            ARCHIVE
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-6 text-white/30 font-bold tracking-[0.2em] uppercase text-xs max-w-md"
                    >
                        All 10 designs. Premium streetwear. Limited stock.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {dbProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.07 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className={cn(
                                "relative aspect-square bg-white/5 rounded-2xl overflow-hidden mb-4 border transition-all duration-700",
                                hoveredId === product.id
                                    ? "border-[#FF9F43]/40 shadow-[0_20px_60px_rgba(255,159,67,0.15)]"
                                    : "border-white/5"
                            )}>
                                {product.isFeatured && (
                                    <div className="absolute top-3 left-3 z-10 flex items-center space-x-1 bg-[#FF9F43] px-2 py-1 rounded-full">
                                        <Star size={8} fill="black" className="text-black" />
                                        <span className="text-[7px] font-black text-black tracking-widest uppercase">Featured</span>
                                    </div>
                                )}
                                {product.isNewDrop && (
                                    <div className="absolute top-3 right-3 z-10 bg-[#e6ff00] px-2 py-1 rounded-full">
                                        <span className="text-[7px] font-black text-black tracking-widest uppercase">New</span>
                                    </div>
                                )}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    className={cn(
                                        "object-contain p-6 transition-all duration-700",
                                        hoveredId === product.id ? "scale-110 rotate-1" : "scale-100"
                                    )}
                                />
                                <div className={cn(
                                    "absolute inset-0 flex items-end justify-center pb-4 transition-all duration-500",
                                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                                )}>
                                    <div className="bg-[#FF9F43] text-black p-3 rounded-full shadow-lg">
                                        <Plus size={18} />
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <h3 className={cn(
                                    "text-xs font-bold font-syncopate tracking-tight uppercase leading-tight mb-1 transition-colors duration-300",
                                    hoveredId === product.id ? "text-[#FF9F43]" : "text-white/80"
                                )}>
                                    {product.name}
                                </h3>
                                <p className="text-xs text-white/30 font-bold tracking-widest">${product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {dbProducts.length === 0 && (
                    <div className="py-60 text-center">
                        <p className="text-white/20 font-black tracking-[0.5em] text-xs uppercase animate-pulse">Loading Collection...</p>
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

export default CollectionsPage;
