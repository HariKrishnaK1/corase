const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    variants: [
      {
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
      },
    ],
    isNewDrop: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const mockProducts = [
  {
    id: "1",
    name: "CYBERPUNK MECHA TEE",
    price: 85,
    image: "/products/cyber-tee.png",
    description: "Jet black heavy cotton oversized tee. Intricate, glowing cyberpunk mecha robotic design on the back and a small minimal futuristic logo on the front.",
    sizes: ["S", "M", "L", "XL"],
    isFeatured: true,
    isNewDrop: true
  },
  {
    id: "2",
    name: "ACID WASH GOTHIC TEE",
    price: 75,
    image: "/products/acid-tee.png",
    description: "Acid wash dark grey/charcoal color. Large, detailed gothic metallic logo with thorny vines intertwined.",
    sizes: ["M", "L", "XL"],
    isFeatured: true,
    isNewDrop: true
  },
  {
    id: "3",
    name: "VOID TEE",
    price: 65,
    image: "/products/void-tee.png",
    description: "Premium heavy-weight cotton tee with minimal VOID chest print. Relaxed fit for the modern silhouette.",
    sizes: ["S", "M", "L", "XL"],
    isFeatured: false,
    isNewDrop: false
  },
  {
    id: "4",
    name: "NEON OVERLOAD",
    price: 75,
    image: "/products/neon-tee.png",
    description: "Cyberpunk inspired neon graphics on washed black cotton. Featuring high-density screen printing.",
    sizes: ["M", "L", "XL"],
    isFeatured: false,
    isNewDrop: false
  },
  {
    id: "5",
    name: "ARCHIVE 01",
    price: 60,
    image: "/products/archive-tee.png",
    description: "Distressed edge detailing with tonal embroidery. A staple piece from the CORASE archive.",
    sizes: ["S", "M", "L"],
    isFeatured: false,
    isNewDrop: false
  },
  {
    id: "6",
    name: "LINEAR LOGO",
    price: 55,
    image: "/products/tee-1.png",
    description: "Horizontal stretched brand logo across the chest. Minimalist design with maximum impact.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isFeatured: false,
    isNewDrop: false
  },
  {
    id: "7",
    name: "GHOST MASK",
    price: 80,
    image: "/products/tee-2.png",
    description: "Large back graphic featuring the signature Ghost Mask motif. Premium fabric with custom tag.",
    sizes: ["L", "XL", "XXL"],
    isFeatured: false,
    isNewDrop: false
  },
  {
    id: "8",
    name: "NEO TOKYO STREET TEE",
    price: 70,
    image: "/products/tee-3.png",
    description: "Oversized fit with neon tokyo graphics on the back. Reflective detailing.",
    sizes: ["S", "M", "L"],
    isFeatured: false,
    isNewDrop: false
  },
  {
    id: "9",
    name: "VINTAGE WASH 02",
    price: 65,
    image: "/products/acid-tee.png",
    description: "Vintage faded wash. Drop shoulder. Blank front.",
    sizes: ["M", "L", "XL"],
    isFeatured: false,
    isNewDrop: false
  },
  {
    id: "10",
    name: "ESSENTIAL BLANK",
    price: 45,
    image: "/products/void-tee.png",
    description: "The perfect blank tee. 250gsm core spun cotton.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isFeatured: false,
    isNewDrop: false
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("Connected to MongoDB.");

    await Product.deleteMany({});
    console.log("Cleared existing products.");

    const seedData = mockProducts.map((p) => {
      // Simulate inventory scenarios
      const isOutOfStock = p.id === "5";
      const stockAmount = isOutOfStock ? 0 : p.id === "3" ? 2 : 50;

      return {
        id: p.id,
        title: p.name,
        price: p.price,
        description: p.description,
        images: [p.image],
        isNewDrop: p.isNewDrop,
        isFeatured: p.isFeatured,
        variants: p.sizes.map((size) => ({
          size,
          stock: stockAmount,
        })),
      };
    });

    const inserted = await Product.insertMany(seedData);
    console.log(`Successfully seeded ${inserted.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
