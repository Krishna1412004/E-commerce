import ProductsView from "@/components/ui/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductsByCategory";


export default async function CategoryPage({ params }: {params : Promise<{slug: string}>}) {
    const { slug } = await params;
    const products = await getProductByCategory(slug);
    const categories = await getAllCategories();

    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4 dark:bg-gray-950 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-8xl dark:bg-gray-950 items-center">
                <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
                    {slug
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}{" "}
                    Collection
                </h1>
                <ProductsView products={products} categories={categories} />    
            </div>
        </div>
    );
}
