import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Product from "@/models/Product";
import { products as mockProducts } from "@/data/products";

export async function POST() {
  try {
    await connectToDatabase();

    // Clear existing products to prevent duplicates during testing
    await Product.deleteMany({});

    // Map mock data to our new schema structure
    const seedData = mockProducts.map((p, index) => {
      // Simulate "Out of Stock" for product 3 ("ARCHIVE 01")
      const isOutOfStock = p.id === "3";
      // Simulate "Low Stock" for product 5 ("GHOST MASK")
      const stockAmount = isOutOfStock ? 0 : p.id === "5" ? 2 : 50;

      return {
        id: p.id,
        title: p.name, // Our schema uses title
        price: p.price,
        description: p.description,
        images: [p.image], // Mock uses single image string, schema uses array
        isNewDrop: index < 2, // Make the first two products "New Drop"
        variants: p.sizes.map((size) => ({
          size,
          stock: stockAmount,
        })),
      };
    });

    const inserted = await Product.insertMany(seedData);

    return NextResponse.json({ message: "Seed successful", count: inserted.length });
  } catch (error) {
    console.error("Error seeding products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
