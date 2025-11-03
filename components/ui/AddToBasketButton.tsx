"use client";

import useBasketStore from "@/app/(store)/store/store";
import { Product } from "@/sanity/types";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
    product: Product;
    disabled: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore();

    const itemCount = getItemCount(product._id);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if(!isClient) return null;

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => removeItem(product._id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    itemCount === 0 
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                }`}
                disabled={itemCount === 0 || disabled}
            >
                <span className="text-xl font-medium">−</span>
            </button>
            <span className="w-10 text-center text-lg font-medium">{itemCount}</span>
            <button
                onClick={() => addItem(product)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                }`}
                disabled={disabled}
            >
                <span className="text-white text-xl font-medium">+</span>
            </button>
        </div>
    );
}

export default AddToBasketButton;
