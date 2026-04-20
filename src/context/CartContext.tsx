"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProductVariant {
    size: string;
    stock: number;
    _id?: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    color: string;
    category?: string;
    sizes: string[];
    variants?: ProductVariant[];
    isNewDrop?: boolean;
    isFeatured?: boolean;
}

interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('corase-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('corase-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, size: string) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
            if (existingItem) {
                return prev.map(item => 
                    (item.id === product.id && item.selectedSize === size) 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            }
            return [...prev, { ...product, quantity: 1, selectedSize: size }];
        });
        setIsOpen(true);
    };

    const removeFromCart = (productId: string, size: string) => {
        setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
    };

    const updateQuantity = (productId: string, size: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId, size);
            return;
        }
        setCart(prev => prev.map(item => 
            (item.id === productId && item.selectedSize === size) 
            ? { ...item, quantity } 
            : item
        ));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, updateQuantity, clearCart, 
            totalItems, totalPrice, isOpen, setIsOpen 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
