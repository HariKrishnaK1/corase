"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import Footer from "@/components/layout/Footer";

// Routes that should NOT show the site navbar/footer (have their own chrome)
const NO_SHELL_ROUTES = ["/admin", "/login", "/register"];

export default function SiteShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = NO_SHELL_ROUTES.some((r) => pathname.startsWith(r));

    return (
        <>
            {!isAdminRoute && <Navbar />}
            {!isAdminRoute && <CartDrawer />}
            <main className="relative min-h-screen">{children}</main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
