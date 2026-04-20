import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Parse URL params
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const query: any = {};
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Fetch products, sorted by newest first
    const rawProducts = await Product.find(query).sort({ createdAt: -1 });
    
    const products = rawProducts.map((p: any) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      description: p.description,
      image: p.images[0],
      variants: p.variants,
      sizes: p.variants.map((v: any) => v.size),
      isNewDrop: p.isNewDrop,
      isFeatured: p.isFeatured,
      color: "#FFFFFF" // Fallback for Aura effect
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
