"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    LayoutDashboard, Package, ShoppingCart, Users,
    TrendingUp, ArrowUpRight, AlertTriangle, Star,
    LogOut, ChevronRight, Eye, Menu, X
} from 'lucide-react';
import Logo from '@/components/layout/Logo';

const STATS = [
    { label: 'Revenue',   value: '₹2,46,850', change: '+18.2%', icon: TrendingUp,   color: '#FF9F43' },
    { label: 'Orders',    value: '1,247',      change: '+12.5%', icon: ShoppingCart, color: '#818cf8' },
    { label: 'Products',  value: '10',         change: '2 new',  icon: Package,      color: '#a78bfa' },
    { label: 'Customers', value: '842',         change: '+9.1%',  icon: Users,        color: '#34d399' },
];

const ORDERS = [
    { id: '#CR-1091', customer: 'Arjun Mehta',  product: 'Cyberpunk Mecha Tee',  size: 'L',   amount: '₹85', status: 'delivered', date: '21 Apr' },
    { id: '#CR-1090', customer: 'Priya Sharma', product: 'Acid Wash Gothic Tee', size: 'M',   amount: '₹75', status: 'shipped',   date: '21 Apr' },
    { id: '#CR-1089', customer: 'Rohit Das',    product: 'Neon Overload',         size: 'XL',  amount: '₹75', status: 'processing',date: '20 Apr' },
    { id: '#CR-1088', customer: 'Sneha Iyer',   product: 'Void Tee',              size: 'S',   amount: '₹65', status: 'delivered', date: '20 Apr' },
    { id: '#CR-1087', customer: 'Karan Nair',   product: 'Ghost Mask',            size: 'XXL', amount: '₹80', status: 'cancelled', date: '19 Apr' },
];

const PRODUCTS = [
    { name: 'Cyberpunk Mecha Tee', price: 85, stock: 48, sales: 124, rating: 4.9 },
    { name: 'Acid Wash Gothic Tee', price: 75, stock: 32, sales: 98,  rating: 4.8 },
    { name: 'Neon Overload',        price: 75, stock: 41, sales: 76,  rating: 4.7 },
    { name: 'Void Tee',             price: 65, stock: 2,  sales: 112, rating: 4.6 },
    { name: 'Ghost Mask',           price: 80, stock: 0,  sales: 89,  rating: 4.5 },
];

const STATUS: Record<string, { label: string; cls: string }> = {
    delivered:  { label: 'Delivered',  cls: 'bg-emerald-500/15 text-emerald-400' },
    shipped:    { label: 'Shipped',    cls: 'bg-blue-500/15 text-blue-400' },
    processing: { label: 'Processing', cls: 'bg-amber-500/15 text-amber-400' },
    cancelled:  { label: 'Cancelled',  cls: 'bg-red-500/15 text-red-400' },
};

const NAV = [
    { icon: LayoutDashboard, label: 'Overview',  tab: 'overview'  },
    { icon: ShoppingCart,    label: 'Orders',    tab: 'orders'    },
    { icon: Package,         label: 'Products',  tab: 'products'  },
] as const;
type Tab = typeof NAV[number]['tab'];

const SIDEBAR_W = 'w-64';
const SIDEBAR_ML = 'lg:ml-64';

export default function AdminDashboard() {
    const [tab, setTab] = useState<Tab>('overview');
    const [open, setOpen] = useState(false);

    const title = tab === 'overview' ? 'Dashboard' : tab === 'orders' ? 'Orders' : 'Products';

    const Sidebar = () => (
        <aside className={`
            fixed top-0 left-0 h-full ${SIDEBAR_W}
            bg-[#111] border-r border-white/[0.07]
            flex flex-col z-40
            transition-transform duration-300 ease-out
            ${open ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
        `}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
                <div className="flex items-center gap-3">
                    <Logo className="w-8 h-8 text-[#FF9F43]" />
                    <div>
                        <p className="text-base font-black font-syncopate text-white tracking-tight leading-none">CORASE</p>
                        <p className="text-xs text-[#FF9F43] font-bold tracking-widest uppercase mt-0.5">Admin Panel</p>
                    </div>
                </div>
                <button className="lg:hidden text-white/40 hover:text-white p-1" onClick={() => setOpen(false)}>
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {NAV.map(({ icon: Icon, label, tab: t }) => (
                    <button
                        key={t}
                        onClick={() => { setTab(t); setOpen(false); }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl
                            text-base font-semibold transition-all
                            ${tab === t
                                ? 'bg-[#FF9F43] text-black'
                                : 'text-white/45 hover:text-white hover:bg-white/[0.07]'
                            }
                        `}
                    >
                        <Icon size={18} />
                        {label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/[0.07] space-y-1">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.07] text-base font-semibold transition-all"
                >
                    <Eye size={18} /> View Site
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-white/[0.07] text-base font-semibold transition-all">
                    <LogOut size={18} /> Sign Out
                </button>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-white">
            {/* Mobile overlay */}
            {open && (
                <div className="fixed inset-0 bg-black/70 z-30 lg:hidden" onClick={() => setOpen(false)} />
            )}

            <Sidebar />

            {/* Main area — offset by sidebar width on lg+ */}
            <div className={`${SIDEBAR_ML} min-h-screen flex flex-col`}>

                {/* Top bar */}
                <header className="sticky top-0 z-20 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/[0.07]">
                    <div className="flex items-center justify-between px-5 sm:px-8 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden text-white/50 hover:text-white transition-colors"
                                onClick={() => setOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                            <div>
                                <h1 className="text-lg sm:text-xl font-black font-syncopate tracking-tight uppercase leading-none">{title}</h1>
                                <p className="text-sm text-white/35 font-medium mt-0.5">Welcome back, Admin</p>
                            </div>
                        </div>
                        {/* Mobile quick tabs */}
                        <div className="flex items-center gap-2 lg:hidden">
                            {NAV.map(({ icon: Icon, tab: t }) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`p-2.5 rounded-xl transition-all ${tab === t ? 'bg-[#FF9F43] text-black' : 'bg-white/[0.07] text-white/45'}`}
                                >
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-5 sm:p-8 space-y-6">

                    {/* ─── Overview ─── */}
                    {tab === 'overview' && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                                {STATS.map((s, i) => (
                                    <motion.div
                                        key={s.label}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className="bg-white/[0.05] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${s.color}18` }}>
                                                <s.icon size={20} style={{ color: s.color }} />
                                            </div>
                                            <span className="text-sm font-bold text-emerald-400 flex items-center gap-0.5">
                                                <ArrowUpRight size={14} />{s.change}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-black text-white leading-none mb-1">{s.value}</p>
                                        <p className="text-sm text-white/35 font-medium">{s.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                                    <h2 className="text-base font-black font-syncopate tracking-tight uppercase">Recent Orders</h2>
                                    <button
                                        onClick={() => setTab('orders')}
                                        className="text-sm text-[#FF9F43] font-bold flex items-center gap-1 hover:gap-1.5 transition-all"
                                    >
                                        View All <ChevronRight size={15} />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[600px]">
                                        <thead>
                                            <tr className="border-b border-white/[0.07]">
                                                {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                                                    <th key={h} className="text-left text-xs font-bold text-white/35 uppercase tracking-wider px-6 py-3.5">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ORDERS.slice(0, 4).map(o => (
                                                <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.025] transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-[#FF9F43] whitespace-nowrap">{o.id}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-white/75">{o.customer}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-white/50 max-w-[160px] truncate">{o.product}</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-white whitespace-nowrap">{o.amount}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${STATUS[o.status].cls}`}>
                                                            {STATUS[o.status].label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Alert */}
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
                                <AlertTriangle size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-amber-400 text-base mb-1">Low Stock Alert</p>
                                    <p className="text-white/50 text-sm font-medium leading-relaxed">
                                        <span className="text-white font-semibold">Void Tee</span> has only 2 units left.{' '}
                                        <span className="text-white font-semibold">Ghost Mask</span> is out of stock.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ─── Orders ─── */}
                    {tab === 'orders' && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
                                <div className="px-6 py-4 border-b border-white/[0.07]">
                                    <h2 className="text-base font-black font-syncopate tracking-tight uppercase">All Orders</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[700px]">
                                        <thead>
                                            <tr className="border-b border-white/[0.07]">
                                                {['Order', 'Customer', 'Product', 'Size', 'Amount', 'Date', 'Status'].map(h => (
                                                    <th key={h} className="text-left text-xs font-bold text-white/35 uppercase tracking-wider px-6 py-3.5">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ORDERS.map(o => (
                                                <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.025] transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-[#FF9F43] whitespace-nowrap">{o.id}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-white/75 whitespace-nowrap">{o.customer}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-white/50 max-w-[150px] truncate">{o.product}</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-white/40">{o.size}</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-white">{o.amount}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-white/35 whitespace-nowrap">{o.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${STATUS[o.status].cls}`}>
                                                            {STATUS[o.status].label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ─── Products ─── */}
                    {tab === 'products' && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                                    <h2 className="text-base font-black font-syncopate tracking-tight uppercase">Products</h2>
                                    <Link href="/collections" className="text-sm text-[#FF9F43] font-bold flex items-center gap-1 hover:gap-1.5 transition-all">
                                        View Store <ChevronRight size={15} />
                                    </Link>
                                </div>
                                <div className="divide-y divide-white/[0.05]">
                                    {PRODUCTS.map((p, i) => (
                                        <div key={p.name} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-white/[0.025] transition-colors">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <span className="text-white/25 font-black text-base w-6 flex-shrink-0 text-center">{i + 1}</span>
                                                <div className="min-w-0">
                                                    <p className="text-base font-semibold text-white/80 truncate">{p.name}</p>
                                                    <div className="flex items-center gap-3 mt-0.5">
                                                        <span className="flex items-center gap-1 text-sm text-white/35">
                                                            <Star size={12} fill="#FF9F43" className="text-[#FF9F43]" />
                                                            {p.rating}
                                                        </span>
                                                        <span className="text-white/15">·</span>
                                                        <span className="text-sm text-white/35">{p.sales} sold</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 sm:gap-10 flex-shrink-0">
                                                <span className="text-base font-bold text-white">₹{p.price}</span>
                                                <span className={`text-sm font-bold whitespace-nowrap ${p.stock === 0 ? 'text-red-400' : p.stock <= 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                    {p.stock === 0 ? 'Out of stock' : `${p.stock} in stock`}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
