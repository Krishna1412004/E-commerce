import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

// Define the query outside the function so typegen can find it
export const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[
        _type == "product"
        && (
            name match $searchParam
            || categories[]->name match $searchParam
        )
    ] {
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
        "categories": categories[]->
    } | order(name asc)
`);

export const searchProductsByName = async (searchParam: string) => {
    try {
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                searchParam: `*${searchParam}*`,
            },
        });
        return products.data || [];
    } catch (error) {
        console.error("Error searching for products:", error);
        return [];
    }
};
