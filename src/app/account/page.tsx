"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, Heart, Package, MapPin, Settings, ChevronRight, Trash2, LogOut } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

const mockOrders = [
    { id: '#CR-1087', product: 'Cyberpunk Mecha Tee', size: 'L', price: 85, status: 'Delivered', date: '18 Apr 2026', image: 'https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_200/corase/products/cyber-tee' },
    { id: '#CR-1054', product: 'Acid Wash Gothic Tee', size: 'M', price: 75, status: 'Shipped', date: '15 Apr 2026', image: 'https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_200/corase/products/acid-tee' },
];

const TABS = [
    { id: 'orders',    label: 'Orders',    icon: Package },
    { id: 'wishlist',  label: 'Wishlist',  icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'profile',   label: 'Profile',   icon: Settings },
] as const;

type TabId = typeof TABS[number]['id'];

function AccountPageInner() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<TabId>('orders');
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const tab = searchParams.get('tab') as TabId | null;
        if (tab && TABS.some(t => t.id === tab)) setActiveTab(tab);
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white pt-28 pb-20 px-5 lg:px-10">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#FF9F43]/15 border border-[#FF9F43]/25 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={22} className="text-[#FF9F43]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black font-syncopate tracking-tight text-white uppercase">
                            Your Account
                        </h1>
                        <p className="text-white/35 text-sm font-medium">guest@corase.com</p>
                    </div>
                    <button className="ml-auto flex items-center gap-2 text-white/30 hover:text-red-400 transition-colors text-sm font-medium">
                        <LogOut size={15} />
                        <span className="hidden sm:block">Sign Out</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-7 overflow-x-auto pb-1">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                                activeTab === id
                                    ? 'bg-[#FF9F43] text-black font-bold'
                                    : 'bg-white/[0.06] text-white/45 hover:bg-white/[0.1] hover:text-white border border-white/[0.07]'
                            }`}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    ))}
                </div>

                {/* ─ Orders ─ */}
                {activeTab === 'orders' && (
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                        {mockOrders.map(order => (
                            <div
                                key={order.id}
                                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 flex items-center gap-4 hover:border-white/[0.12] transition-all"
                            >
                                <div className="relative w-16 h-16 bg-white/[0.06] rounded-xl overflow-hidden flex-shrink-0">
                                    <Image src={order.image} alt={order.product} fill sizes="64px" className="object-contain p-2" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-[#FF9F43] font-bold mb-0.5">{order.id}</p>
                                    <p className="text-sm font-semibold text-white truncate">{order.product}</p>
                                    <p className="text-xs text-white/35 font-medium mt-1">
                                        Size {order.size} · ₹{order.price} · {order.date}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 text-right">
                                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                                        order.status === 'Delivered'
                                            ? 'bg-emerald-500/15 text-emerald-400'
                                            : 'bg-blue-500/15 text-blue-400'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <p className="text-[10px] text-white/25 font-medium mt-2 flex items-center justify-end gap-0.5">
                                        Track <ChevronRight size={9} />
                                    </p>
                                </div>
                            </div>
                        ))}
                        {mockOrders.length === 0 && (
                            <div className="text-center py-20">
                                <Package size={40} className="mx-auto mb-4 text-white/15" />
                                <p className="text-white/25 font-bold text-xs uppercase tracking-widest">No orders yet</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* ─ Wishlist ─ */}
                {activeTab === 'wishlist' && (
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                        {wishlist.length === 0 ? (
                            <div className="text-center py-20">
                                <Heart size={40} className="mx-auto mb-4 text-white/15" />
                                <p className="text-white/25 font-bold text-xs uppercase tracking-widest mb-6">
                                    Your wishlist is empty
                                </p>
                                <Link
                                    href="/collections"
                                    className="inline-block bg-[#FF9F43] text-black px-7 py-3 rounded-full font-black font-syncopate text-xs tracking-widest uppercase hover:bg-[#e88e30] transition-all"
                                >
                                    Browse Collection
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {wishlist.map(item => (
                                    <div
                                        key={item.id}
                                        className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-3.5 hover:border-white/[0.12] transition-all"
                                    >
                                        <div className="relative aspect-square bg-white/[0.05] rounded-xl overflow-hidden mb-3">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 33vw"
                                                className="object-contain p-3"
                                            />
                                        </div>
                                        <p className="text-xs font-bold text-white truncate mb-1">{item.name}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-white/35 font-medium">${item.price}</p>
                                            <button
                                                onClick={() => toggleWishlist(item)}
                                                className="text-white/25 hover:text-red-400 transition-colors p-0.5"
                                                title="Remove"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* ─ Addresses ─ */}
                {activeTab === 'addresses' && (
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 max-w-sm">
                            <div className="flex items-center gap-2.5 mb-4">
                                <MapPin size={16} className="text-[#FF9F43]" />
                                <p className="font-bold text-sm text-white">Default Address</p>
                            </div>
                            <p className="text-sm text-white/50 font-medium leading-relaxed">
                                123, Brigade Road<br />
                                Bangalore, Karnataka 560001<br />
                                India
                            </p>
                            <button className="mt-4 text-[#FF9F43] text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                                Edit <ChevronRight size={11} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ─ Profile ─ */}
                {activeTab === 'profile' && (
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 max-w-sm">
                        {[
                            ['Full Name', 'Guest User'],
                            ['Email', 'guest@corase.com'],
                            ['Phone', '+91 98765 43210'],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">
                                    {label}
                                </label>
                                <input
                                    defaultValue={value}
                                    className="w-full bg-white/[0.06] border border-white/[0.1] text-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#FF9F43]/60 transition-all"
                                />
                            </div>
                        ))}
                        <button className="bg-[#FF9F43] text-black px-7 py-3 rounded-xl font-black font-syncopate text-xs tracking-widest uppercase hover:bg-[#e88e30] hover:shadow-[0_8px_30px_rgba(255,159,67,0.3)] transition-all duration-300">
                            Save Changes
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function AccountPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#FF9F43]/30 border-t-[#FF9F43] rounded-full animate-spin" />
            </div>
        }>
            <AccountPageInner />
        </Suspense>
    );
}
