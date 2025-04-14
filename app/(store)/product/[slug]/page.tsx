import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from '@sanity/image-url';
import { groq } from "next-sanity";
import AddToBasketWrapper from "@/components/ui/AddToBasketWrapper";

const builder = imageUrlBuilder(client);

interface Props {
    params: { slug: string }
}

async function getProduct(slug: string) {
    if (!slug) {
        console.log('No slug provided to getProduct');
        return null;
    }

    // First, let's get all products to debug
    const allProductsQuery = groq`*[_type == "product"]{
        _id,
        name,
        "slug": slug.current
    }`;
    
    try {
        const allProducts = await client.fetch(allProductsQuery);
        console.log('All available products:', allProducts);
        console.log('Looking for slug:', slug);
        
        // Now get the specific product
        const query = groq`*[_type == "product" && slug.current match $slug][0]{
            _id,
            name,
            price,
            currency,
            stock,
            description,
            "slug": slug.current,
            image {
                asset->{
                    _id,
                    url
                }
            },
            categories[]->
        }`;

        const product = await client.fetch(query, { slug });
        console.log('Found product:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export default async function Page({ params }: Props) {
    console.log('Received params:', params);
    const slug = params?.slug;
    
    if (!slug) {
        console.log('No slug in params');
        return notFound();
    }

    const product = await getProduct(slug);

    if (!product) {
        console.log('No product found for slug:', slug);
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;
    const imageUrl = product.image?.asset?.url || '';

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div 
                        className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
                            isOutOfStock ? "opacity-50" : ""
                        }`}
                    >
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={product.name ?? "Product Image"}
                                fill
                                className="object-contain transition-transform duration-300 hover:scale-105"
                            />
                        )}
                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <span className="text-white text-lg font-bold">Out of Stock</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                            <div className="text-xl font-semibold mb-4">
                                {product.currency === 'inr' ? '₹' : product.currency === 'usd' ? '$' : product.currency === 'gbp' ? '£' : '€'}
                                {product.price?.toFixed(2)}
                            </div>
                            <div className="prose max-w-none mb-6">
                                {Array.isArray(product.description) && (
                                    <PortableText value={product.description} />
                                )}
                            </div>
                            <div className="mt-6">
                                <AddToBasketWrapper product={product} disabled={isOutOfStock} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function generateMetadata({ params }: Props) {
    const slug = params?.slug;
    
    if (!slug) {
        return { title: 'Product Not Found' };
    }

    const product = await getProduct(slug);
    
    return {
        title: product?.name || 'Product Not Found',
    };
}
