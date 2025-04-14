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
        <div className="flex items-center justify-center space-x-2">
            <button
                onClick={() => removeItem(product._id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    itemCount === 0 
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                disabled={itemCount === 0 || disabled}
            >
                <span className={`text-xl font-bold ${
                    itemCount === 0 
                    ? "text-gray-400" 
                    : "text-gray-700"
                }`}>
                    -
                </span>
            </button>
            <span className="w-8 text-center font-semibold">{itemCount}</span>
            <button
                onClick={() => addItem(product)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    disabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={disabled}
            >
                <span className="text-xl font-bold text-white">
                    +
                </span>
            </button>
        </div>
    );
}   

export default AddToBasketButton;
