import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const footerLinks = {
    Shop: [
        { label: 'All Products', href: '/shop' },
        { label: 'Collections', href: '/collections' },
        { label: 'New Drops', href: '/shop?filter=new' },
    ],
    Help: [
        { label: 'Size Guide', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'Contact Us', href: '#' },
    ],
    Company: [
        { label: 'About', href: '/about' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
    ],
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0a0a0a] text-white border-t border-white/5">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-16">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 mb-5">
                            <Logo className="w-8 h-8 text-[#FF9F43]" />
                            <span className="text-lg font-black font-syncopate tracking-tighter text-white">CORASE</span>
                        </Link>
                        <p className="text-white/30 text-xs font-bold leading-relaxed max-w-[200px] mb-6">
                            Premium streetwear for the bold and the restless. Limited drops. Archive quality.
                        </p>
                        <div className="flex items-center space-x-3">
                            {[
                                { label: 'IG', href: '#', title: 'Instagram' },
                                { label: '𝕏', href: '#', title: 'Twitter / X' },
                                { label: '▶', href: '#', title: 'YouTube' },
                            ].map(({ label, href, title }) => (
                                <a
                                    key={title}
                                    href={href}
                                    title={title}
                                    className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs font-black"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-5">{section}</p>
                            <ul className="space-y-3">
                                {links.map(link => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-xs font-bold text-white/50 hover:text-white transition-colors duration-200"
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
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <p className="font-black font-syncopate text-sm uppercase tracking-tight mb-1">Stay in the Loop</p>
                        <p className="text-white/40 text-xs font-bold">Get first access to new drops and exclusive offers.</p>
                    </div>
                    <div className="flex w-full md:w-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 md:w-64 bg-white/5 border border-white/10 border-r-0 text-white placeholder-white/20 rounded-l-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#FF9F43] transition-all"
                        />
                        <button className="bg-[#FF9F43] text-black px-6 py-3 rounded-r-xl font-black text-xs tracking-widest uppercase hover:bg-[#e88e30] transition-all whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
                    <p className="text-white/20 text-xs font-bold">
                        © 2026 CORASE. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <span className="text-white/20 text-xs font-bold">Made with obsession in India 🇮🇳</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
