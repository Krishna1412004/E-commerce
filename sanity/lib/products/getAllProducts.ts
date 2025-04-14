import { defineQuery } from "next-sanity";
import { client } from "../client";

export const PRODUCTS_QUERY = defineQuery(
  `*[_type == "product"] {
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
  } | order(name asc)`
);

export async function getAllProducts() {
    try {
        console.log('Fetching products...');
        const products = await client.fetch(PRODUCTS_QUERY);
        console.log('Products fetched:', products);
        return products;
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
}