import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import ProductGrid from "@/components/ui/ProductGrid";
import BlackFridayBanner from "@/components/ui/BlackFridayBanner";

interface SearchPageProps {
    searchParams: {
        query?: string;
    };
}

async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.query || '';
    const products = await searchProductsByName(query);
    
    return (
        <>
            <BlackFridayBanner />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">
                    Search Results for "{query}"
                </h1>
                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
                        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                            <h1 className="text-3xl font-bold mb-6 text-center">No products found for:{query}</h1>
                            <p className="text-gray-600 mb-6 text-center">Please try a different search or check back later.</p>
                        </div>
                    </div>
                ) : (
                    <ProductGrid products={products} />
                )}
            </div>
        </>
    );
}

export default SearchPage;