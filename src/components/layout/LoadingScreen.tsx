"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Allow time for exit animation
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const letters = "CORASE".split("");

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999] bg-[#FF9F43] flex items-center justify-center"
                >
                    <div className="flex space-x-2 md:space-x-4">
                        {letters.map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 100, filter: 'blur(20px)', scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                                transition={{
                                    duration: 1.2,
                                    delay: index * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="text-5xl md:text-8xl font-bold font-syncopate tracking-[-0.05em] text-white brand-glow italic"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                    
                    {/* Liquid Sweep Effect */}
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
