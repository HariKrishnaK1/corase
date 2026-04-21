"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Product } from '@/context/CartContext';
import Image from 'next/image';
import { Plus, ArrowRight } from 'lucide-react';

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

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 20,
        restDelta: 0.001
    });

    // Derived active index — which product is "focused"
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        return smoothProgress.on("change", (v) => {
            setActiveIndex(v > 0.5 ? 1 : 0);
        });
    }, [smoothProgress]);

    if (!products || products.length === 0) return null;

    // Clamp to exactly 2 for this layout
    const p0 = products[0];
    const p1 = products[1] ?? products[0];

    return (
        <div ref={containerRef} className="relative h-[350vh] bg-[#FF9F43]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Ambient gradient shifts with scroll */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: useTransform(
                            smoothProgress,
                            [0, 1],
                            [
                                "radial-gradient(ellipse at 60% 50%, rgba(255,200,100,0.35) 0%, transparent 70%)",
                                "radial-gradient(ellipse at 40% 50%, rgba(255,150,50,0.35) 0%, transparent 70%)",
                            ]
                        )
                    }}
                />

                {/* Vertical label */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4 opacity-20 z-10">
                    <span className="text-[9px] font-black tracking-[0.5em] uppercase rotate-90 origin-center whitespace-nowrap text-white">
                        Archives 2026
                    </span>
                    <div className="w-px h-20 bg-white" />
                </div>

                {/* Scroll progress dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-20">
                    {[0, 1].map(i => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-500 ${
                                activeIndex === i
                                    ? "w-2 h-6 bg-white"
                                    : "w-2 h-2 bg-white/30"
                            }`}
                        />
                    ))}
                </div>

                {/* Cards container */}
                <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
                    <ProductCard
                        product={p0}
                        progress={smoothProgress}
                        isFirst={true}
                        onSelect={onSelectProduct}
                    />
                    {p1 && p1 !== p0 && (
                        <ProductCard
                            product={p1}
                            progress={smoothProgress}
                            isFirst={false}
                            onSelect={onSelectProduct}
                        />
                    )}
                </div>

                {/* Bottom Info — transitions between products */}
                <div className="absolute bottom-16 inset-x-0 flex flex-col items-center z-30 pointer-events-none">
                    <ProductInfo
                        p0={p0}
                        p1={p1}
                        progress={smoothProgress}
                        onSelect={onSelectProduct}
                    />
                </div>

                {/* Scroll hint — fades out after first scroll */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-40"
                    style={{ opacity: useTransform(smoothProgress, [0, 0.15], [0.4, 0]) }}
                >
                    <div className="w-px h-10 bg-white animate-pulse" />
                    <span className="text-[8px] tracking-[0.4em] text-white font-bold uppercase">Scroll</span>
                </motion.div>
            </div>
        </div>
    );
};

// ─── Product Card ────────────────────────────────────────────────

interface CardProps {
    product: Product;
    progress: any;
    isFirst: boolean;
    onSelect: (p: Product) => void;
}

const ProductCard = ({ product, progress, isFirst, onSelect }: CardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const dragX = useMotionValue(0);
    const innerRotateY = useTransform(dragX, [-200, 200], [-30, 30]);

    // Product 0 (isFirst): starts centered → moves LEFT as scroll increases
    // Product 1 (!isFirst): starts peeking RIGHT → moves to center as scroll increases
    const x = useTransform(
        progress,
        [0, 0.45, 0.55, 1],
        isFirst
            ? ["0%", "-20%", "-45%", "-62%"]
            : ["58%", "35%", "12%", "0%"]
    );

    const scale = useTransform(
        progress,
        [0, 0.45, 0.55, 1],
        isFirst
            ? [1, 0.88, 0.78, 0.72]
            : [0.76, 0.88, 0.98, 1]
    );

    const opacity = useTransform(
        progress,
        [0, 0.4, 0.6, 1],
        isFirst
            ? [1, 0.8, 0.45, 0.2]
            : [0.55, 0.75, 0.95, 1]
    );

    const rotateY = useTransform(
        progress,
        [0, 0.5, 1],
        isFirst ? [0, -8, -18] : [12, 5, 0]
    );

    const zIndex = useTransform(
        progress,
        [0, 0.48, 0.52, 1],
        isFirst ? [10, 10, 4, 4] : [4, 4, 10, 10]
    );

    const blurAmount = useTransform(
        progress,
        [0, 0.4, 0.6, 1],
        isFirst ? [0, 0, 3, 6] : [5, 3, 0, 0]
    );

    return (
        <motion.div
            style={{ x, scale, opacity, zIndex, rotateY, filter: useTransform(blurAmount, b => `blur(${b}px)`) }}
            className="absolute will-change-transform cursor-pointer"
            onClick={() => onSelect(product)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-[65vw] h-[50vh] md:w-[380px] md:h-[500px]"
                drag="x"
                dragConstraints={{ left: -120, right: 120 }}
                dragElastic={0.15}
                style={{ rotateY: innerRotateY, x: dragX }}
                onDragStart={() => setIsHovered(true)}
                onDragEnd={() => {
                    setIsHovered(false);
                    dragX.set(0);
                }}
                whileTap={{ cursor: "grabbing" }}
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 65vw, 380px"
                    className="object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
                    priority={isFirst}
                    quality={85}
                />

                {/* 360° hint on hover */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none flex items-center space-x-2"
                >
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-widest whitespace-nowrap">
                        Drag for 360°
                    </span>
                </motion.div>

                {/* Shimmer on hover */}
                <motion.div
                    animate={isHovered ? { x: ["-120%", "220%"] } : { x: "-120%" }}
                    transition={{ duration: 1.2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
                />
            </motion.div>
        </motion.div>
    );
};

// ─── Product Info (bottom) ───────────────────────────────────────

const ProductInfo = ({
    p0, p1, progress, onSelect
}: { p0: Product; p1: Product; progress: any; onSelect: (p: Product) => void }) => {

    const opacity0 = useTransform(progress, [0, 0.35, 0.5], [1, 0.6, 0]);
    const y0 = useTransform(progress, [0, 0.4, 0.5], [0, -8, -20]);

    const opacity1 = useTransform(progress, [0.5, 0.65, 1], [0, 0.7, 1]);
    const y1 = useTransform(progress, [0.5, 0.65, 1], [20, 8, 0]);

    return (
        <div className="relative h-32 flex items-center justify-center w-full pointer-events-none">
            {/* Product 0 info */}
            <motion.div
                style={{ opacity: opacity0, y: y0 }}
                className="absolute flex flex-col items-center text-center pointer-events-auto"
            >
                <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase mb-1">
                    Featured Drop
                </p>
                <h2 className="text-2xl md:text-4xl font-black font-syncopate italic tracking-tighter text-white mb-2 uppercase">
                    {p0.name}
                </h2>
                <p className="text-white/60 font-bold tracking-[0.3em] text-sm mb-4">${p0.price}</p>
                <button
                    onClick={() => onSelect(p0)}
                    className="flex items-center space-x-3 bg-white text-[#FF9F43] px-8 py-3 rounded-full font-black font-syncopate text-[9px] tracking-widest hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95"
                >
                    <span>EXPLORE PIECE</span>
                    <Plus size={12} className="hover:rotate-90 transition-transform" />
                </button>
            </motion.div>

            {/* Product 1 info */}
            {p1 && p1 !== p0 && (
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute flex flex-col items-center text-center pointer-events-auto"
                >
                    <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase mb-1">
                        Latest Arrival
                    </p>
                    <h2 className="text-2xl md:text-4xl font-black font-syncopate italic tracking-tighter text-white mb-2 uppercase">
                        {p1.name}
                    </h2>
                    <p className="text-white/60 font-bold tracking-[0.3em] text-sm mb-4">${p1.price}</p>
                    <button
                        onClick={() => onSelect(p1)}
                        className="flex items-center space-x-3 bg-white text-[#FF9F43] px-8 py-3 rounded-full font-black font-syncopate text-[9px] tracking-widest hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95"
                    >
                        <span>EXPLORE PIECE</span>
                        <ArrowRight size={12} />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default ProductRotation;
