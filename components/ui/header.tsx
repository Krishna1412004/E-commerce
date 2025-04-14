"use client";

import { ClerkLoaded, SignedIn, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { ShoppingCart, Package, Search, Info } from "lucide-react";
import UserButton from "@/app/components/UserButton";
import useBasketStore from "@/app/(store)/store/store";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
    const { user, isSignedIn } = useUser();
    const items = useBasketStore((state) => state.items);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
            <nav className="w-full max-w-[2000px] mx-auto h-16">
                <div className="flex items-center justify-between h-full px-6 gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/"
                            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
                        >
                            Shopr
                        </Link>

                        <Link href="/about" 
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        >
                            <Info className="w-5 h-5" />
                            <span>About Us</span>
                        </Link>
                    </div>

                    <Form action="/search" className="flex-1 max-w-xl">
                        <div className="relative">
                            <input 
                                type="text" 
                                name="query" 
                                placeholder="Search For Products" 
                                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 border border-gray-200 dark:border-gray-700"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </Form>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <Link
                            href="/basket"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5" />
                                {mounted && items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-blue-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {items.length}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:inline">My Basket</span>
                        </Link>

                        <Link
                            href="/orders"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        >
                            <Package className="w-5 h-5" />
                            <span className="hidden sm:inline">My Orders</span>
                        </Link>

                        <ClerkLoaded>
                            {isSignedIn ? (
                                <UserButton />
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                                        Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </ClerkLoaded>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header; 