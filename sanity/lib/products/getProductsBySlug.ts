import { defineQuery } from "next-sanity"
import { client } from "../client";

const PRODUCTS_BY_SLUG_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    price,
    currency,
    stock,
    description,
    slug,
    image {
        asset->{
            _id,
            url
        }
    },
    categories[]->
}`);

export async function getProductBySlug(slug: string) {
    if (!slug) {
        console.error('getProductBySlug called without a slug');
        return null;
    }

    try {
        console.log('Fetching product with slug:', slug);
        const product = await client.fetch(PRODUCTS_BY_SLUG_QUERY, { slug });
        
        if (!product) {
            console.log('No product found with slug:', slug);
            return null;
        }

        return product;
    } catch (error) {
        console.error("Error fetching product by slug:", error);
        return null;
    }
}
