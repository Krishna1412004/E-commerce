'use client';

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import AddToBasketWrapper from "@/components/ui/AddToBasketWrapper";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { VariantSelector } from "@/components/ui/VariantSelector";
import { ViewBasketButton } from "@/components/ui/ViewBasketButton";

interface Variant {
    storage: string;
    ram: string;
    additionalPrice: number;
    stock: number;
}

interface ProductViewProps {
    product: any;
}

export function ProductView({ product }: ProductViewProps) {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
        product.variants?.length > 0 
            ? product.variants.reduce((prev: Variant, curr: Variant) => 
                prev.additionalPrice < curr.additionalPrice ? prev : curr
            )
            : null
    );

    const mainImageUrl = product.image?.asset?.url || '';
    
    // Prepare images for the carousel
    const carouselImages = [];
    
    // Add main image if it exists
    if (mainImageUrl) {
        carouselImages.push({
            url: mainImageUrl,
            alt: product.name || "Product Image"
        });
    }
    
    // Add additional images if they exist
    if (product.additionalImages && Array.isArray(product.additionalImages)) {
        product.additionalImages.forEach((img: any) => {
            if (img?.asset?.url) {
                carouselImages.push({
                    url: img.asset.url,
                    alt: product.name || "Product Image"
                });
            }
        });
    }

    const handleVariantChange = (variant: Variant) => {
        setSelectedVariant(variant);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                    className="relative aspect-square overflow-hidden rounded-lg shadow-lg"
                >
                    {carouselImages.length > 0 ? (
                        <ProductCarousel 
                            images={carouselImages}
                            className=""
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">No image available</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center min-h-full">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="prose max-w-none mb-6">
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )}
                        </div>
                        {product.variants?.length > 0 ? (
                            <div className="mt-6">
                                <VariantSelector
                                    variants={product.variants}
                                    selectedVariant={selectedVariant}
                                    onVariantChange={handleVariantChange}
                                    basePrice={product.basePrice}
                                    currency={product.currency}
                                />
                            </div>
                        ) : (
                            <div className="text-xl font-semibold mb-4">
                                {product.currency === 'inr' ? '₹' : product.currency === 'usd' ? '$' : product.currency === 'gbp' ? '£' : '€'}
                                {product.basePrice?.toFixed(2)}
                            </div>
                        )}
                        
                        <div className="mt-6 flex items-center gap-4">
                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-2 backdrop-blur-sm">
                                <AddToBasketWrapper 
                                    product={{
                                        ...product,
                                        price: selectedVariant 
                                            ? product.basePrice + selectedVariant.additionalPrice
                                            : product.basePrice,
                                        stock: selectedVariant?.stock ?? 0
                                    }}
                                    disabled={!selectedVariant || selectedVariant.stock <= 0}
                                />
                            </div>
                            <div className="flex-1">
                                <ViewBasketButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 