"use client";

import Hero from "@/components/home/Hero";
import ProductRotation from "@/components/home/ProductRotation";
import ProductModal from "@/components/products/ProductModal";
import LoadingScreen from "@/components/layout/LoadingScreen";
import AboutSection from "@/components/home/AboutSection";
import { useState, useEffect } from "react";
import { Product } from "@/context/CartContext";
import { motion } from "framer-motion";

// Fallback products shown when DB is unreachable
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "CYBERPUNK MECHA TEE",
    price: 85,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/cyber-tee",
    description: "Jet black heavy cotton oversized tee.",
    variants: [{ size: "S", stock: 10 }, { size: "M", stock: 10 }, { size: "L", stock: 10 }, { size: "XL", stock: 10 }],
    sizes: ["S", "M", "L", "XL"],
    isNewDrop: true,
    isFeatured: true,
    color: "#FF9F43",
  },
  {
    id: "2",
    name: "ACID WASH GOTHIC TEE",
    price: 75,
    image: "https://res.cloudinary.com/dg0juhz7e/image/upload/f_auto,q_auto,w_800/corase/products/acid-tee",
    description: "Acid wash dark grey/charcoal color.",
    variants: [{ size: "M", stock: 10 }, { size: "L", stock: 10 }, { size: "XL", stock: 5 }],
    sizes: ["M", "L", "XL"],
    isNewDrop: true,
    isFeatured: true,
    color: "#FF9F43",
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const res = await fetch("/api/products?featured=true", {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFeaturedProducts(data);
          }
        }
      } catch {
        // Use fallback products — already set
        console.info("Using fallback products (DB unreachable)");
      }
    }
    loadProducts();
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loadingComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="snap-container bg-[#FF9F43]"
      >
        <section className="snap-section h-screen bg-[#FF9F43]">
          <Hero />
        </section>

        <section className="snap-section min-h-screen bg-[#FF9F43]">
          <ProductRotation
            products={featuredProducts}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        </section>

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
