import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Mail, Phone, MapPin, AtSign, PlayCircle, Share2 } from 'lucide-react';

const LINKS = {
    Shop: [
        { label: 'All Products',   href: '/shop' },
        { label: 'New Arrivals',   href: '/shop?filter=new' },
        { label: 'Oversized Tees', href: '/shop?filter=oversized' },
        { label: 'Graphic Tees',   href: '/shop?filter=graphic' },
        { label: 'Collections',    href: '/collections' },
    ],
    Help: [
        { label: 'Size Guide',     href: '#' },
        { label: 'Shipping Info',  href: '#' },
        { label: 'Easy Returns',   href: '#' },
        { label: 'Track Order',    href: '#' },
        { label: 'Contact Us',     href: '#' },
    ],
    Company: [
        { label: 'About CORASE',   href: '/about' },
        { label: 'Our Story',      href: '/about' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Use',   href: '#' },
        { label: 'Careers',        href: '#' },
    ],
};

const SOCIALS = [
    { icon: AtSign,      label: 'Instagram',   href: '#', color: '#E1306C' },
    { icon: Share2,      label: 'X / Twitter', href: '#', color: '#1DA1F2' },
    { icon: PlayCircle,  label: 'YouTube',     href: '#', color: '#FF0000' },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#080808] text-white border-t border-white/[0.06]">

            {/* Main grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14 lg:gap-12 mb-20">

                    {/* Brand column — spans 2 on lg */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-8">
                            <Logo className="w-12 h-12 text-[#FF9F43]" />
                            <div>
                                <span className="text-2xl font-black font-syncopate tracking-tight text-white block leading-none">CORASE</span>
                                <span className="text-xs text-[#FF9F43] font-bold tracking-widest uppercase">Premium Streetwear</span>
                            </div>
                        </Link>

                        <p className="text-white/40 text-base font-medium leading-relaxed max-w-[300px] mb-10">
                            Premium streetwear for the bold and the restless. Limited drops, archive quality, and zero compromises.
                        </p>

                        {/* Contact */}
                        <div className="space-y-4 mb-10">
                            <a href="mailto:hello@corase.in" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
                                <div className="w-9 h-9 bg-white/[0.05] rounded-xl flex items-center justify-center group-hover:bg-[#FF9F43]/15 transition-colors">
                                    <Mail size={16} className="text-white/40 group-hover:text-[#FF9F43] transition-colors" />
                                </div>
                                <span className="text-sm font-medium">hello@corase.in</span>
                            </a>
                            <div className="flex items-center gap-3 text-white/30">
                                <div className="w-9 h-9 bg-white/[0.05] rounded-xl flex items-center justify-center">
                                    <Phone size={16} className="text-white/30" />
                                </div>
                                <span className="text-sm font-medium">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/30">
                                <div className="w-9 h-9 bg-white/[0.05] rounded-xl flex items-center justify-center">
                                    <MapPin size={16} className="text-white/30" />
                                </div>
                                <span className="text-sm font-medium">Mumbai, Maharashtra, India 🇮🇳</span>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex items-center gap-3">
                            {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    title={label}
                                    className="w-11 h-11 bg-white/[0.05] border border-white/[0.08] rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([section, links]) => (
                        <div key={section}>
                            <p className="text-xs font-black text-white/25 uppercase tracking-[0.4em] mb-8">{section}</p>
                            <ul className="space-y-5">
                                {links.map(link => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm font-medium text-white/45 hover:text-white hover:pl-2 transition-all duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-3xl p-10 md:p-12 mb-16">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="flex-1 space-y-2">
                            <h3 className="text-2xl font-black font-syncopate text-white uppercase tracking-tight">
                                Stay in the Loop
                            </h3>
                            <p className="text-white/40 text-base font-medium">
                                Get first access to new drops, exclusive discounts, and archive restocks.
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto gap-0">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 md:w-72 bg-white/[0.06] border border-white/[0.1] border-r-0 text-white placeholder-white/25 rounded-l-2xl px-5 py-4 text-base font-medium focus:outline-none focus:border-[#FF9F43] transition-all"
                            />
                            <button className="bg-[#FF9F43] text-black px-7 py-4 rounded-r-2xl font-black text-sm tracking-widest uppercase hover:bg-[#e88e30] transition-all whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Payment icons row */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Paytm', 'GPay'].map(p => (
                        <div key={p} className="bg-white/[0.05] border border-white/[0.07] rounded-xl px-4 py-2">
                            <span className="text-xs font-bold text-white/30">{p}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-8">
                    <p className="text-white/20 text-sm font-medium">
                        © 2026 CORASE. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-white/20 text-sm font-medium hover:text-white/50 transition-colors">Privacy</Link>
                        <Link href="#" className="text-white/20 text-sm font-medium hover:text-white/50 transition-colors">Terms</Link>
                        <Link href="#" className="text-white/20 text-sm font-medium hover:text-white/50 transition-colors">Cookies</Link>
                        <span className="text-white/15 text-sm font-medium hidden sm:inline">Made with obsession in India 🇮🇳</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
