"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    
    // Smooth trailing physics
    const cursorX = useSpring(0, { stiffness: 500, damping: 50 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 50 });

    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY, isVisible]);

    // Hide on mobile/touch
    if (isTouchDevice) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-5 h-5 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999] opacity-40"
            style={{
                x: cursorX,
                y: cursorY,
                display: isVisible ? 'block' : 'none'
            }}
        />
    );
};

export default CustomCursor;
