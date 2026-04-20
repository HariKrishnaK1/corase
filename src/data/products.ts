import { Product } from "@/context/CartContext";

export const products: Product[] = [
  {
    id: "1",
    name: "VOID TEE",
    price: 65,
    image: "/products/tee-1.png",
    description: "Premium heavy-weight cotton tee with minimal VOID chest print. Relaxed fit for the modern silhouette.",
    color: "#1a1a1a",
    category: "Tshirts",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "NEON OVERLOAD",
    price: 75,
    image: "/products/tee-2.png",
    description: "Cyberpunk inspired neon graphics on washed black cotton. Featuring high-density screen printing.",
    color: "#0f172a",
    category: "Tshirts",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "3",
    name: "ARCHIVE 01",
    price: 60,
    image: "/products/tee-3.png",
    description: "Distressed edge detailing with tonal embroidery. A staple piece from the CORASE archive.",
    color: "#262626",
    category: "Tshirts",
    sizes: ["S", "M", "L"]
  },
  {
    id: "4",
    name: "LINEAR LOGO",
    price: 55,
    image: "/products/tee-4.png",
    description: "Horizontal stretched brand logo across the chest. Minimalist design with maximum impact.",
    color: "#171717",
    category: "Tshirts",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "5",
    name: "GHOST MASK",
    price: 80,
    image: "/products/tee-5.png",
    description: "Large back graphic featuring the signature Ghost Mask motif. Premium fabric with custom tag.",
    color: "#0a0a0a",
    category: "Tshirts",
    sizes: ["L", "XL", "XXL"]
  }
];
