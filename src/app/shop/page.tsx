"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/context/CartContext';
import Image from 'next/image';
import ProductModal from '@/components/products/ProductModal';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['ALL', 'TSHIRTS', 'HOODIES', 'ACCESSORIES'];

const ShopPage = () => {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [dbProducts, setDbProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 6000);
                const res = await fetch('/api/products', { signal: controller.signal });
                clearTimeout(timeout);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                // Guard: only set if it's actually an array
                if (Array.isArray(data)) {
                    setDbProducts(data);
                } else {
                    setHasError(true);
                }
            } catch {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Guard: always an array, filter safely
    const filteredProducts = (Array.isArray(dbProducts) ? dbProducts : []).filter(p =>
        activeCategory === 'ALL' || (p as any).category?.toUpperCase() === activeCategory || activeCategory === 'TSHIRTS'
    );

    // Error state UI
    if (hasError) {
        return (
            <div className="bg-[#e6ff00] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-black font-black font-syncopate text-2xl uppercase italic mb-4">Restocking Soon</p>
                    <p className="text-black/50 font-bold text-sm mb-6">Our catalog is temporarily unavailable.</p>
                    <button onClick={() => window.location.reload()} className="bg-black text-[#e6ff00] px-8 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#e6ff00] min-h-screen pt-40 pb-20 px-6 lg:px-12 relative">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
            
            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 space-y-10 md:space-y-0">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="w-12 h-px bg-black" />
                            <span className="text-[10px] font-black tracking-[0.5em] text-black uppercase">Archival Collection</span>
                        </div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-bold font-syncopate tracking-tighter text-black leading-none uppercase italic"
                        >
                            THE SHOP
                        </motion.h1>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-[10px] font-bold font-syncopate tracking-tight transition-all duration-500 uppercase",
                                    activeCategory === cat 
                                        ? "bg-black text-[#e6ff00] shadow-[0_0_20px_rgba(0,0,0,0.2)]" 
                                        : "bg-black/5 text-black/40 hover:bg-black/10 hover:text-black"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="relative aspect-[4/5] bg-black/5 rounded-[2.5rem] overflow-hidden mb-8 border border-black/5 shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 blur-[80px]" 
                                    style={{ backgroundColor: product.color }}
                                />
                                <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    fill 
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 p-12 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                                />
                                <div className="absolute inset-x-0 bottom-10 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                    <div className="bg-black text-[#e6ff00] p-4 rounded-full">
                                        <Plus size={24} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end px-4">
                                <div>
                                    <p className="text-[10px] font-black text-black/40 tracking-[0.4em] uppercase mb-2">
                                        {product.category || 'TSHIRTS'}
                                    </p>
                                    <h3 className="text-xl md:text-2xl font-bold font-syncopate tracking-tighter text-black uppercase italic leading-none">
                                        {product.name}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-black/30 tracking-widest">${product.price}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {isLoading && (
                    <div className="py-40 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-2 border-black/20 border-t-black rounded-full animate-spin mb-4" />
                        <p className="text-black/30 font-black tracking-[0.4em] text-xs uppercase">Loading Collection...</p>
                    </div>
                )}

                {!isLoading && filteredProducts.length === 0 && (
                    <div className="py-60 text-center">
                        <p className="text-black/20 font-black tracking-[0.5em] text-xs uppercase">Restocking Soon</p>
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
