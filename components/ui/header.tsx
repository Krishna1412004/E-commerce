"use client";

import { ClerkLoaded, SignedIn, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { ShoppingBag, PackageSearch, Search, Info, ShoppingBasket } from "lucide-react";
import UserButton from "@/app/components/UserButton";
import useBasketStore from "@/app/(store)/store/store";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
                <div className="flex items-center justify-between h-full px-8 gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/"
                            className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
                        >
                            SmartSphere
                        </Link>

                        <Button variant="default" size="sm" className="hidden md:inline-flex bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 min-w-[120px]" asChild>
                            <Link href="/about" className="gap-2">
                                <Info className="w-4 h-4" />
                                <span>About Us</span>
                            </Link>
                        </Button>
                    </div>

                    <Form action="/search" className="flex-1 max-w-3xl px-4">
                        <div className="relative w-full">
                            <input 
                                type="text" 
                                name="query" 
                                placeholder="Search For Products" 
                                className="w-full h-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pl-11 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-600 focus:ring-opacity-50 border border-gray-200 dark:border-gray-800 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </Form>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="default" size="sm" className="relative bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 min-w-[100px]" asChild>
                                <Link href="/basket">
                                    <ShoppingBag className="w-4 h-4 sm:mr-2" />
                                    {mounted && items.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                                            {items.length}
                                        </span>
                                    )}
                                    <span className="hidden sm:inline">Basket</span>
                                </Link>
                            </Button>

                            <Button variant="default" size="sm" className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 min-w-[100px]" asChild>
                                <Link href="/orders" className="gap-2">
                                    <PackageSearch className="w-4 h-4" />
                                    <span className="hidden sm:inline">Orders</span>
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <ClerkLoaded>
                                {isSignedIn ? (
                                    <div className="flex items-center gap-3">
                                        <UserButton />
                                        <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-300">
                                            Welcome back, {user?.firstName || 'User'}
                                        </span>
                                    </div>
                                ) : (
                                    <SignInButton mode="modal">
                                        <Button size="sm" variant="default" className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white min-w-[100px]">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                )}
                            </ClerkLoaded>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header; 