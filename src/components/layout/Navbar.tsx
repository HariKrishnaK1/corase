"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems, setIsOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ease-out px-6 py-6 lg:px-12 lg:py-8",
            isScrolled ? "bg-[#FF9F43]/80 backdrop-blur-xl py-4 border-b border-white/10" : "bg-transparent"
        )}>
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="group relative flex items-center space-x-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-4"
                    >
                        <Logo className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-500" />
                        <span className="text-xl font-bold font-syncopate tracking-tighter text-white leading-none brand-glow mt-[2px]">
                            CORASE
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 lg:gap-12">
                    {['HOME', 'SHOP', 'COLLECTIONS', 'ABOUT'].map((item, index) => (
                        <Link 
                            key={item} 
                            href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                            className="group relative"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.8 }}
                                className="text-[10px] font-bold font-syncopate tracking-[0.2em] text-white/60 group-hover:text-white transition-all duration-500 block uppercase"
                            >
                                {item}
                            </motion.span>
                            {/* Hover Energy Line */}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-white transition-all duration-500 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6 lg:space-x-10">
                    <button 
                        onClick={() => setIsOpen(true)}
                        className="group relative flex items-center space-x-3 text-white/50 hover:text-white transition-all duration-500 z-[201] cursor-pointer"
                    >
                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                        {totalItems > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-white text-[#FF9F43] text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                            >
                                {totalItems}
                            </motion.span>
                        )}
                        <span className="hidden lg:block text-[9px] font-bold font-syncopate tracking-tight transform translate-y-px text-white">BAG</span>
                    </button>
                    
                    <button 
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-[#FF9F43] z-[99] flex flex-col items-center justify-center space-y-12"
                    >
                        {['HOME', 'SHOP', 'COLLECTIONS', 'ABOUT'].map((item) => (
                            <Link 
                                key={item} 
                                href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-4xl font-bold font-syncopate tracking-tighter text-white hover:italic transition-all uppercase"
                            >
                                {item}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
