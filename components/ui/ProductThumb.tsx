'use client';

import { Product } from "@/sanity/types";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function ProductThumb({product}: {product: Product}) {
    const isOutOfStock = product.stock != null && product.stock <= 0;
    
    if (!product.slug) {
        console.error('Product is missing slug:', product);
        return null;
    }
    
    console.log('ProductThumb rendering product:', {
        id: product._id,
        name: product.name,
        slug: product.slug,
        fullProduct: product
    });
    
    const imageUrl = product.image ? builder.image(product.image).url() : '';
    const productUrl = `/product/${encodeURIComponent(product.slug)}`;
    console.log('Generated product URL:', productUrl);
    
    return (
        <Link
            href={productUrl}
            className={`group flex flex-col bg-white rounded-lg border border-gray-200
            shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden w-full max-w-sm ${
                isOutOfStock ? "opacity-50" : ""
            }`}
        >
            <div className="relative w-full pt-[100%]">
                {product.image && (
                    <Image
                        className="object-contain transition-transform duration-300
                        group-hover:scale-105 absolute top-0 left-0"
                        src={imageUrl}
                        alt={product.name || "Product image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />  
                )}
               
               {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="text-white text-lg font-bold">Out of Stock</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {product.description
                ?.map((block: any) => 
                block._type === 'block'
                 ? block.children?.map((child: any) => child.text).join('')
                 : '')
                .join('') || 'No description available'}
                </p>
                <p className="mt-2 text-lg text-gray-900">
                    {product.currency === 'inr' ? '₹' : product.currency === 'usd' ? '$' : product.currency === 'gbp' ? '£' : '€'}
                    {product.price?.toFixed(2)}
                </p>
            </div>
        </Link>
    );
}

export default ProductThumb;

