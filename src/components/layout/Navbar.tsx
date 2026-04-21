"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Heart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { totalItems, setIsOpen } = useCart();
    const { totalWishlist } = useWishlist();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'SHOP', href: '/shop' },
        { label: 'COLLECTIONS', href: '/collections' },
        { label: 'ABOUT', href: '/about' },
    ];

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ease-out px-5 py-5 lg:px-10 lg:py-6",
                isScrolled
                    ? "bg-[#FF9F43]/90 backdrop-blur-xl py-3 shadow-lg"
                    : "bg-transparent"
            )}>
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link href="/" className="group flex items-center space-x-3 flex-shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3"
                        >
                            <Logo className="w-9 h-9 text-white group-hover:scale-110 transition-transform duration-500" />
                            <span className="text-lg font-black font-syncopate tracking-tighter text-white leading-none">
                                CORASE
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-10">
                        {navLinks.map((item, index) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group relative"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 + 0.3 }}
                                    className="text-[10px] font-bold font-syncopate tracking-[0.15em] text-white/60 group-hover:text-white transition-all duration-300 block uppercase"
                                >
                                    {item.label}
                                </motion.span>
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-3 lg:gap-5">

                        {/* Search */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-white/60 hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/10"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        {/* Wishlist */}
                        <Link
                            href="/account?tab=wishlist"
                            className="relative text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                            aria-label="Wishlist"
                        >
                            <Heart size={20} />
                            {totalWishlist > 0 && (
                                <motion.span
                                    key={totalWishlist}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-[#e6ff00] text-black text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                                >
                                    {totalWishlist}
                                </motion.span>
                            )}
                        </Link>

                        {/* Cart */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="group relative flex items-center gap-1.5 text-white/60 hover:text-white transition-all duration-300 cursor-pointer p-2 rounded-lg hover:bg-white/10"
                            aria-label="Shopping bag"
                        >
                            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                            {totalItems > 0 && (
                                <motion.span
                                    key={totalItems}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-white text-[#FF9F43] text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                                >
                                    {totalItems}
                                </motion.span>
                            )}

                        </button>

                        {/* User */}
                        <Link
                            href="/login"
                            className="hidden lg:flex items-center p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Account"
                        >
                            <User size={20} />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-white p-1"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-md flex items-start justify-center pt-32 px-6"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.form
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onSubmit={handleSearch}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl"
                        >
                            <div className="relative">
                                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search tees, drops, styles..."
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-2xl py-5 pl-14 pr-14 text-lg font-bold tracking-wide focus:outline-none focus:border-[#FF9F43] focus:bg-white/15 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="text-center text-white/30 text-xs font-bold tracking-widest uppercase mt-4">
                                Press Enter to search
                            </p>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-[#FF9F43] z-[190] flex flex-col items-center justify-center space-y-10"
                    >
                        <button
                            className="absolute top-6 right-6 text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={28} />
                        </button>
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-4xl font-black font-syncopate tracking-tighter text-white hover:italic transition-all uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-8 pt-8 border-t border-white/20">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 text-sm font-bold uppercase tracking-widest">Sign In</Link>
                            <Link href="/account?tab=wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 text-white/70">
                                <Heart size={18} />
                                <span className="text-sm font-bold uppercase tracking-widest">Wishlist</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
