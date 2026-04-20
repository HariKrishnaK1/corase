"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const CartDrawer: React.FC = () => {
    const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md z-[1000]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FF9F43] z-[1001] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <ShoppingBag className="text-white" size={24} />
                                <h2 className="text-xl font-bold font-syncopate tracking-tighter text-white uppercase italic brand-glow">
                                    YOUR BAG
                                </h2>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                                <X size={28} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                                    <ShoppingBag size={64} className="mb-4 text-white" />
                                    <p className="font-bold font-syncopate tracking-widest text-[10px] text-white">BAG IS EMPTY</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-6 group">
                                        <div className="relative w-24 h-24 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                                            <Image 
                                                src={item.image} 
                                                alt={item.name} 
                                                fill
                                                sizes="96px"
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-xs font-bold font-syncopate text-white uppercase tracking-tight">{item.name}</h3>
                                                <button 
                                                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                    className="text-white/20 hover:text-red-500 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <p className="text-[10px] font-bold text-white/40 mb-3 uppercase tracking-widest">SIZE: {item.selectedSize} — ${item.price}</p>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-3 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                        className="text-white/40 hover:text-white"
                                                    ><Minus size={10} /></button>
                                                    <span className="text-[10px] font-black text-white w-4 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                        className="text-white/40 hover:text-white"
                                                    ><Plus size={10} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 bg-[#FF9F43] border-t border-white/5 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold font-syncopate text-white uppercase italic">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-white text-[#FF9F43] py-5 rounded-full font-black tracking-[0.4em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center space-x-2 group">
                                    <span>PROCEED TO CHECKOUT</span>
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
