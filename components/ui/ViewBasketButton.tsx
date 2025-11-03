'use client';

import { ShoppingBasket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './button';

export function ViewBasketButton() {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.push('/basket')}
            size="lg"
            className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white shadow-lg group overflow-hidden rounded-2xl border-0 relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
            <div className="relative flex items-center justify-center py-2 gap-2">
                <ShoppingBasket className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="font-medium">View Basket</span>
            </div>
        </Button>
    );
} 