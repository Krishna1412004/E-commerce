'use client';

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Variant {
    storage: string;
    ram: string;
    additionalPrice: number;
    stock: number;
}

interface VariantSelectorProps {
    variants: Variant[];
    selectedVariant: Variant | null;
    onVariantChange: (variant: Variant) => void;
    basePrice: number;
    currency: string;
}

export function VariantSelector({
    variants,
    selectedVariant: initialVariant,
    onVariantChange,
    basePrice,
    currency
}: VariantSelectorProps) {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(initialVariant);

    const currencySymbol = 
        currency === 'inr' ? '₹' : 
        currency === 'usd' ? '$' : 
        currency === 'gbp' ? '£' : '€';

    const handleVariantSelect = (variant: Variant) => {
        setSelectedVariant(variant);
        onVariantChange(variant);
    };

    // Calculate grid columns based on number of variants
    const gridCols = variants.length <= 2 ? variants.length : 3;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-base font-semibold">Select Configuration</Label>
                <div className={cn(
                    "grid gap-3 mx-auto",
                    gridCols === 1 ? "grid-cols-1 max-w-[280px]" :
                    gridCols === 2 ? "grid-cols-2 max-w-[580px]" :
                    "grid-cols-3 max-w-full"
                )}>
                    {variants.map((variant, index) => (
                        <button
                            key={`${variant.storage}-${variant.ram}-${index}`}
                            onClick={() => handleVariantSelect(variant)}
                            disabled={variant.stock <= 0}
                            className={cn(
                                "group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300",
                                selectedVariant === variant
                                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 animate-selected"
                                    : variant.stock > 0
                                    ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 hover:translate-y-[-2px] hover:shadow-md"
                                    : "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
                            )}
                        >
                            <div className={cn(
                                "text-sm font-medium mb-1",
                                selectedVariant === variant
                                    ? "text-white dark:text-gray-900"
                                    : "text-gray-900 dark:text-gray-100"
                            )}>
                                {variant.storage}GB Storage
                            </div>
                            <div className={cn(
                                "text-xs mb-2",
                                selectedVariant === variant
                                    ? "text-gray-300 dark:text-gray-700"
                                    : "text-gray-600 dark:text-gray-400"
                            )}>
                                {variant.ram}GB RAM
                            </div>
                            <div className={cn(
                                "text-base font-semibold",
                                selectedVariant === variant
                                    ? "text-white dark:text-gray-900"
                                    : "text-gray-900 dark:text-gray-100"
                            )}>
                                {currencySymbol}{(basePrice + variant.additionalPrice).toLocaleString()}
                            </div>
                            {variant.stock <= 0 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl backdrop-blur-[1px]">
                                    <span className="text-white text-sm font-medium">Out of Stock</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
} 