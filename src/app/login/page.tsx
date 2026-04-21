"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Lock, Mail } from 'lucide-react';
import Logo from '@/components/layout/Logo';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-5 sm:px-6 py-10 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF9F43] rounded-full blur-[200px] opacity-[0.08]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 mb-12 w-fit">
                    <Logo className="w-9 h-9 text-[#FF9F43]" />
                    <span className="text-xl font-black font-syncopate tracking-tight text-white">CORASE</span>
                </Link>

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-black font-syncopate tracking-tight text-white uppercase leading-tight mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-base text-white/45 font-medium">
                        Sign in to your account to continue shopping.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-white/60 uppercase tracking-widest">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-white/[0.07] border border-white/[0.12] text-white text-base placeholder-white/25 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#FF9F43] focus:bg-white/[0.1] transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-bold text-white/60 uppercase tracking-widest">
                                Password
                            </label>
                            <button type="button" className="text-sm text-[#FF9F43] font-semibold hover:underline">
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-white/[0.07] border border-white/[0.12] text-white text-base placeholder-white/25 rounded-2xl pl-12 pr-14 py-4 focus:outline-none focus:border-[#FF9F43] focus:bg-white/[0.1] transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me */}
                    <label className="flex items-center gap-3 cursor-pointer pt-1">
                        <input type="checkbox" className="accent-[#FF9F43] w-4 h-4 flex-shrink-0" />
                        <span className="text-base text-white/45 font-medium select-none">Remember me on this device</span>
                    </label>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-[#FF9F43] text-black py-4 rounded-2xl font-black text-base tracking-wide uppercase flex items-center justify-center gap-3 hover:bg-[#e88e30] hover:shadow-[0_12px_40px_rgba(255,159,67,0.4)] transition-all duration-300 active:scale-[0.98] mt-2"
                    >
                        Sign In
                        <ArrowRight size={20} />
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-1">
                        <div className="flex-1 h-px bg-white/[0.08]" />
                        <span className="text-sm text-white/25 font-medium">or continue as</span>
                        <div className="flex-1 h-px bg-white/[0.08]" />
                    </div>

                    {/* Guest button */}
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="w-full bg-transparent border-2 border-white/[0.12] text-white/70 py-4 rounded-2xl font-semibold text-base hover:border-white/25 hover:text-white hover:bg-white/[0.05] transition-all duration-300 active:scale-[0.98]"
                    >
                        Guest
                    </button>
                </form>

                {/* Register link */}
                <p className="text-center text-base text-white/35 font-medium mt-8">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-[#FF9F43] font-bold hover:underline">
                        Create one
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
