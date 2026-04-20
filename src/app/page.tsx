"use client";

import Hero from "@/components/home/Hero";
import ProductRotation from "@/components/home/ProductRotation";
import ProductModal from "@/components/products/ProductModal";
import LoadingScreen from "@/components/layout/LoadingScreen";
import AboutSection from "@/components/home/AboutSection";
import { useState, useEffect } from "react";
import { Product } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function Home() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products?featured=true");
        const data = await res.json();
        setDbProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }
    loadProducts();
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="snap-container bg-[#FF9F43]"
      >
        <section className="snap-section h-screen bg-[#FF9F43]">
          <Hero />
        </section>

        <section className="snap-section min-h-screen bg-[#FF9F43]">
          {dbProducts.length > 0 ? (
            <ProductRotation products={dbProducts} onSelectProduct={(p) => setSelectedProduct(p)} />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-white font-syncopate font-bold text-xs tracking-widest animate-pulse">LOADING...</span>
            </div>
          )}
        </section>
        
        {/* About Section */}
        <section className="snap-section bg-black">
          <AboutSection />
        </section>
      </motion.div>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
