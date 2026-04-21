"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Truck, Shield, ArrowLeft, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type PaymentMethod = 'upi' | 'card' | 'cod';

const FIELDS = [
    { key: 'name',    label: 'Full Name',   placeholder: 'Arjun Mehta',       type: 'text',  col: 2 },
    { key: 'email',   label: 'Email',        placeholder: 'you@example.com',   type: 'email', col: 1 },
    { key: 'phone',   label: 'Phone',        placeholder: '+91 98765 43210',   type: 'tel',   col: 1 },
    { key: 'address', label: 'Address',      placeholder: '123, MG Road',      type: 'text',  col: 2 },
    { key: 'city',    label: 'City',         placeholder: 'Bangalore',         type: 'text',  col: 1 },
    { key: 'state',   label: 'State',        placeholder: 'Karnataka',         type: 'text',  col: 1 },
    { key: 'pincode', label: 'PIN Code',     placeholder: '560001',            type: 'text',  col: 1 },
] as const;

const PAYMENT_OPTIONS = [
    { id: 'upi',  label: 'UPI',                  sub: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit / Debit Card',   sub: 'Visa, Mastercard, RuPay' },
    { id: 'cod',  label: 'Cash on Delivery',      sub: '₹30 extra handling fee' },
] as const;

export default function CheckoutPage() {
    const { cart, totalPrice, setIsOpen } = useCart();
    const [step, setStep] = useState<'details' | 'success'>('details');
    const [form, setForm] = useState<Record<string, string>>({
        name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
    const [coupon, setCoupon] = useState('');
    const [orderId] = useState(() => `CR-${Math.floor(1000 + Math.random() * 9000)}`);

    const shipping = cart.length > 0 && totalPrice < 1000 ? 99 : 0;
    const finalTotal = totalPrice + shipping;

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 22 }}
                    className="max-w-sm w-full"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', damping: 16 }}
                        className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle2 size={40} className="text-emerald-400" />
                    </motion.div>

                    <h1 className="text-3xl font-black font-syncopate tracking-tight text-white uppercase mb-2">
                        Order Placed!
                    </h1>
                    <p className="text-white/40 font-medium text-sm mb-1">Your order has been confirmed.</p>
                    <p className="text-[#FF9F43] font-black text-xs tracking-[0.2em] uppercase mb-8">
                        #{orderId}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-white/35 text-sm font-medium mb-10">
                        <Truck size={15} className="text-[#FF9F43]" />
                        <span>Estimated delivery: 3–5 business days</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/account?tab=orders"
                            className="bg-[#FF9F43] text-black px-7 py-3 rounded-full font-black font-syncopate text-xs tracking-widest uppercase hover:bg-[#e88e30] transition-all"
                        >
                            Track Order
                        </Link>
                        <Link
                            href="/"
                            className="bg-white/[0.06] border border-white/10 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
                        >
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white pt-28 pb-20 px-5 lg:px-10">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/shop" className="text-white/35 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-black font-syncopate tracking-tight text-white uppercase">
                        Checkout
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* ── Left: Forms ── */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Delivery */}
                        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6">
                            <h2 className="font-black font-syncopate text-sm uppercase tracking-tight mb-5 flex items-center gap-3">
                                <span className="w-6 h-6 bg-[#FF9F43] text-black rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0">1</span>
                                Delivery Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {FIELDS.map(field => (
                                    <div key={field.key} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                                        <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            value={form[field.key]}
                                            onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                            placeholder={field.placeholder}
                                            className="w-full bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF9F43]/60 focus:bg-white/[0.09] transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6">
                            <h2 className="font-black font-syncopate text-sm uppercase tracking-tight mb-5 flex items-center gap-3">
                                <span className="w-6 h-6 bg-[#FF9F43] text-black rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0">2</span>
                                Payment Method
                            </h2>
                            <div className="space-y-2.5">
                                {PAYMENT_OPTIONS.map(option => (
                                    <button
                                        key={option.id}
                                        onClick={() => setPaymentMethod(option.id as PaymentMethod)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                                            paymentMethod === option.id
                                                ? 'border-[#FF9F43] bg-[#FF9F43]/10'
                                                : 'border-white/[0.08] bg-transparent hover:border-white/[0.15] hover:bg-white/[0.03]'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                                            paymentMethod === option.id
                                                ? 'border-[#FF9F43] bg-[#FF9F43]'
                                                : 'border-white/25 bg-transparent'
                                        }`} />
                                        <div>
                                            <p className="font-semibold text-sm text-white">{option.label}</p>
                                            <p className="text-xs text-white/35 font-medium mt-0.5">{option.sub}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Security note */}
                        <div className="flex items-center gap-3 text-white/30 text-xs font-medium bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                            <Shield size={15} className="text-emerald-400 flex-shrink-0" />
                            <span>Your payment info is encrypted and secure. We never store card details.</span>
                        </div>
                    </div>

                    {/* ── Right: Summary ── */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 sticky top-24">
                            <h2 className="font-black font-syncopate text-sm uppercase tracking-tight mb-5">
                                Order Summary
                            </h2>

                            {/* Cart items */}
                            <div className="space-y-3 mb-5 max-h-52 overflow-y-auto pr-1">
                                {cart.length === 0 ? (
                                    <p className="text-white/25 text-sm font-medium text-center py-6">Your cart is empty</p>
                                ) : cart.map(item => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 bg-white/[0.06] rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill sizes="48px" className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-white truncate">{item.name}</p>
                                            <p className="text-[10px] text-white/35 font-medium">Size: {item.selectedSize} × {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold text-white flex-shrink-0">${item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon */}
                            <div className="flex gap-2 mb-5">
                                <div className="relative flex-1">
                                    <Tag size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                                    <input
                                        value={coupon}
                                        onChange={e => setCoupon(e.target.value)}
                                        placeholder="Coupon code"
                                        className="w-full bg-white/[0.06] border border-white/[0.09] text-white placeholder-white/20 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:outline-none focus:border-[#FF9F43]/50 transition-all"
                                    />
                                </div>
                                <button className="bg-white/[0.08] text-white/60 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-white/[0.12] hover:text-white transition-all">
                                    Apply
                                </button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2.5 border-t border-white/[0.07] pt-4 mb-5">
                                <div className="flex justify-between text-sm text-white/40 font-medium">
                                    <span>Subtotal</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-white/40">Shipping</span>
                                    <span className={shipping === 0 ? 'text-emerald-400 font-bold' : 'text-white/40'}>
                                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-base font-black text-white border-t border-white/[0.07] pt-3">
                                    <span>Total</span>
                                    <span>${finalTotal}</span>
                                </div>
                            </div>

                            {shipping === 0 && cart.length > 0 && (
                                <p className="text-emerald-400 text-xs font-bold text-center bg-emerald-500/10 rounded-lg py-2 mb-4">
                                    🎉 You qualify for free shipping!
                                </p>
                            )}

                            <button
                                onClick={() => setStep('success')}
                                disabled={cart.length === 0}
                                className="w-full bg-[#FF9F43] text-black py-3.5 rounded-xl font-black font-syncopate text-xs tracking-[0.15em] uppercase hover:bg-[#e88e30] hover:shadow-[0_8px_40px_rgba(255,159,67,0.35)] transition-all duration-300 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
