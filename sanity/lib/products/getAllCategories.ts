import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories =async () => {
    const All_CATEGORIES_QUERY = defineQuery(`
    *[
        _type == "category"
    ] | order(name asc)
    `);
    try{
        const categories = await sanityFetch({
            query: All_CATEGORIES_QUERY,
        });
        return categories.data || [];
    } catch (error) {
        console.error("Error fetching all categories:", error);
        return [];
    }
};