"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Product, useCart } from '@/context/CartContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!selectedSize) return;
        
        setIsAdding(true);
        setTimeout(() => {
            addToCart(product!, selectedSize);
            setIsAdding(false);
            onClose();
        }, 1000);
    };

    return (
        <AnimatePresence>
            {product && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#FF9F43]/90 backdrop-blur-md"
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative bg-[#FF9F43] w-full max-w-6xl h-full max-h-[850px] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-8 right-8 z-50 text-white/30 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        {/* Image Section */}
                        <div className="flex-1 relative bg-white/5 flex items-center justify-center p-12 overflow-hidden">
                            <div 
                                className="absolute inset-0 opacity-10 blur-[120px]" 
                                style={{ backgroundColor: product.color }}
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="relative w-full h-full"
                            >
                                <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    fill 
                                    className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                                />
                            </motion.div>
                            
                            {/* Watermark Logo */}
                            <div className="absolute bottom-10 left-10 text-[8vw] font-bold font-syncopate tracking-tighter opacity-[0.02] select-none pointer-events-none text-white">
                                CORASE
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-[480px] p-10 md:p-16 flex flex-col justify-center bg-[#FF9F43]">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-8 h-px bg-white" />
                                        <span className="text-[10px] font-black tracking-[0.5em] text-white uppercase leading-none">
                                            Collection 26
                                        </span>
                                    </div>
                                    {product.isNewDrop && (
                                        <span className="px-3 py-1 bg-[#e6ff00] text-black text-[9px] font-black tracking-widest uppercase rounded-full shadow-[0_0_15px_rgba(230,255,0,0.3)]">
                                            New Drop
                                        </span>
                                    )}
                                </div>
                                
                                <h2 className="text-5xl font-bold font-syncopate tracking-tighter text-white mb-4 leading-none uppercase italic">
                                    {product.name}
                                </h2>
                                <p className="text-2xl font-bold text-white/40 mb-10 tracking-widest">${product.price}</p>
                                
                                <div className="space-y-10">
                                    <div>
                                        <div className="flex justify-between mb-4">
                                            <p className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Select Size</p>
                                            <p className="text-[10px] font-bold text-white/20 uppercase underline cursor-pointer">Size Guide</p>
                                        </div>
                                        <div className="grid grid-cols-4 gap-3">
                                            {product.variants?.map((variant) => {
                                                const isOutOfStock = variant.stock === 0;
                                                const size = variant.size;
                                                return (
                                                    <button
                                                        key={size}
                                                        disabled={isOutOfStock}
                                                        onClick={() => !isOutOfStock && setSelectedSize(size)}
                                                        className={cn(
                                                            "relative h-14 border font-bold font-syncopate text-[10px] transition-all duration-500 rounded-xl overflow-hidden",
                                                            selectedSize === size 
                                                                ? "bg-white text-[#FF9F43] border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                                                                : isOutOfStock 
                                                                    ? "bg-black/10 text-white/20 border-white/5 cursor-not-allowed"
                                                                    : "bg-transparent text-white border-white/5 hover:border-white/20"
                                                        )}
                                                    >
                                                        {size}
                                                        {isOutOfStock && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                                                <span className="text-[7px] tracking-[0.3em] font-black text-white/50 -rotate-12 border border-white/10 px-2 py-0.5 rounded-full">SOLD</span>
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {selectedSize && (() => {
                                            const variant = product.variants?.find(v => v.size === selectedSize);
                                            if (variant && variant.stock <= 3 && variant.stock > 0) {
                                                return (
                                                    <p className="mt-3 text-[10px] font-bold text-red-400 tracking-widest uppercase animate-pulse">
                                                        Only {variant.stock} left in stock!
                                                    </p>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-4">Story</p>
                                        <p className="text-sm text-white/60 leading-relaxed font-bold tracking-tight">
                                            {product.description}
                                        </p>
                                    </div>

                                    <button 
                                        onClick={handleAddToCart}
                                        disabled={!selectedSize || isAdding}
                                        className={cn(
                                            "w-full py-6 rounded-full font-black tracking-[0.3em] text-[10px] flex items-center justify-center space-x-3 transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed group shadow-xl",
                                            isAdding ? "bg-white/90 text-[#FF9F43]" : "bg-white text-[#FF9F43] hover:scale-[1.02]"
                                        )}
                                    >
                                        {isAdding ? (
                                            <motion.div 
                                                initial={{ scale: 0 }} 
                                                animate={{ scale: 1 }} 
                                                className="flex items-center space-x-2"
                                            >
                                                <Check size={18} />
                                                <span>ADDED</span>
                                            </motion.div>
                                        ) : (
                                            <>
                                                <ShoppingBag size={18} />
                                                <span>ADD TO BAG</span>
                                                <ArrowRight size={18} className="opacity-40 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
