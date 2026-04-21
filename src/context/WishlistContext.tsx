"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    totalWishlist: number;
    toggleWishlist: (item: WishlistItem) => void;
    isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    totalWishlist: 0,
    toggleWishlist: () => {},
    isWishlisted: () => false,
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("corase_wishlist");
            if (stored) setWishlist(JSON.parse(stored));
        } catch {}
    }, []);

    // Persist on change
    useEffect(() => {
        try {
            localStorage.setItem("corase_wishlist", JSON.stringify(wishlist));
        } catch {}
    }, [wishlist]);

    const toggleWishlist = useCallback((item: WishlistItem) => {
        setWishlist(prev => {
            const exists = prev.find(w => w.id === item.id);
            return exists ? prev.filter(w => w.id !== item.id) : [...prev, item];
        });
    }, []);

    const isWishlisted = useCallback((id: string) => wishlist.some(w => w.id === id), [wishlist]);

    return (
        <WishlistContext.Provider value={{
            wishlist,
            totalWishlist: wishlist.length,
            toggleWishlist,
            isWishlisted,
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
