"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import { Product } from '@/context/CartContext';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductRotationProps {
    products: Product[];
    onSelectProduct: (product: Product) => void;
}

const ProductRotation: React.FC<ProductRotationProps> = ({ products, onSelectProduct }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // High-end spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 25,
        restDelta: 0.001
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#FF9F43]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Dynamic Background Aura */}
                <motion.div 
                    className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none will-change-transform"
                    style={{
                        background: useTransform(smoothProgress, 
                            products.map((_, i) => i / (products.length - 1)),
                            products.map(p => p.color)
                        )
                    }}
                />

                {/* Vertical Brand Label (Cinematic touch) */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4 opacity-20">
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase rotate-90 origin-center whitespace-nowrap text-white">Archives 2026</span>
                    <div className="w-px h-20 bg-white" />
                </div>

                {/* Carousel Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {products.map((product, index) => (
                        <ProductCard 
                            key={product.id}
                            product={product}
                            index={index}
                            total={products.length}
                            progress={smoothProgress}
                            onSelect={onSelectProduct}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

                {/* Active Info Overlay */}
                <div className="absolute inset-x-0 bottom-24 flex flex-col items-center pointer-events-none z-50">
                    <AnimateInfo segments={products} progress={smoothProgress} onSelect={onSelectProduct} />
                </div>
            </div>
        </div>
    );
};

interface CardProps {
    product: Product;
    index: number;
    total: number;
    progress: any;
    onSelect: (p: any) => void;
    isMobile: boolean;
}

const ProductCard = ({ product, index, total, progress, onSelect, isMobile }: CardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const dragX = useMotionValue(0);
    const innerRotateY = useTransform(dragX, [-200, 200], [-35, 35]);
    
    const step = 1 / (total - 1);
    const start = index * step;
    
    // Performance: useMemo is not strictly needed for these useTransform hooks as they are optimized by Framer Motion,
    // but the ranges are calculated once here.
    const range = [start - step, start, start + step];
    
    const x = useTransform(progress, range, ["-120%", "0%", "120%"]);
    const scale = useTransform(progress, range, [0.6, 1.2, 0.6]);
    const rotateY = useTransform(progress, range, [45, 0, -45]);
    const opacity = useTransform(progress, [start - step/2, start, start + step/2], [0.2, 1, 0.2]);
    const zIndex = useTransform(progress, range, [1, 10, 1]);
    const blur = useTransform(progress, range, [isMobile ? 0 : 8, 0, isMobile ? 0 : 8]);

    return (
        <motion.div
            style={{ 
                x, 
                scale, 
                opacity, 
                zIndex, 
                rotateY,
                perspective: 1000,
                filter: useTransform(blur, b => `blur(${b}px)`) 
            }}
            onClick={() => onSelect(product)}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute flex flex-col items-center cursor-pointer will-change-transform"
        >
            <motion.div 
                className={cn(
                    "relative w-[65vw] h-[45vh] md:w-[400px] md:h-[550px] transition-all duration-700 ease-out",
                    isHovered && "scale-[1.05]"
                )}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                dragElastic={0.2}
                style={{ rotateY: innerRotateY, x: dragX }}
                onDragStart={() => setIsHovered(true)}
                onDragEnd={() => setIsHovered(false)}
            >
                <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
                    priority={index < 2}
                />
                
                {/* 360 Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 pointer-events-none flex items-center space-x-2"
                >
                    <div className="w-2 h-2 bg-[#FF9F43] rounded-full animate-pulse" />
                    <span className="text-[8px] font-syncopate text-white uppercase tracking-widest whitespace-nowrap">Swipe for 360°</span>
                </motion.div>

                {/* Cinematic Light Sweep */}
                <motion.div 
                    animate={isHovered ? { x: ['-100%', '200%'] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                />
            </motion.div>
        </motion.div>
    );
};

const AnimateInfo = ({ segments, progress, onSelect }: { segments: Product[], progress: any, onSelect: (p: any) => void }) => {
    return (
        <div className="relative h-40 flex flex-col items-center justify-center pointer-events-auto">
            {segments.map((product, index) => {
                const step = 1 / (segments.length - 1);
                const start = index * step;
                
                const opacity = useTransform(progress, 
                    [start - 0.05, start, start + 0.05], 
                    [0, 1, 0]
                );
                
                const y = useTransform(progress, 
                    [start - 0.05, start, start + 0.05], 
                    [20, 0, -20]
                );

                return (
                    <motion.div
                        key={product.id}
                        style={{ opacity, y }}
                        className="absolute text-center flex flex-col items-center w-[300px]"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-syncopate italic tracking-tighter text-white mb-2 uppercase brand-glow">
                            {product.name}
                        </h2>
                        <div className="flex items-center space-x-3 mb-6">
                            <span className="w-8 h-px bg-white/20" />
                            <p className="text-sm font-black text-white tracking-[0.3em]">${product.price}</p>
                            <span className="w-8 h-px bg-white/20" />
                        </div>
                        <button 
                            onClick={() => onSelect(product)}
                            className="group flex items-center space-x-4 bg-white text-[#FF9F43] px-10 py-4 rounded-full font-bold font-syncopate text-[9px] tracking-widest hover:scale-110 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all active:scale-95 duration-500 brand-glow"
                        >
                            <span>EXPLORE PIECE</span>
                            <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ProductRotation;
