'use client';

import { Product } from "../../sanity/types";
import { Category } from "@/sanity.types";
import { CategorySelectorComponent } from "./category-selector";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
    selectedCategoryId?: string;
}

const ProductsView = ({ 
    products, 
    categories,
    selectedCategoryId 
}: ProductsViewProps) => {
    // Validate categories
    const validCategories = categories?.filter(category => 
        category && 
        typeof category === 'object' && 
        '_id' in category && 
        'title' in category
    ) || [];

    return (
        <div className="w-full">
            <div className="px-6">
                {/* Category filter and products in the same row */}
                <div className="flex items-start gap-4 mb-4">
                    {validCategories.length > 0 ? (
                        <CategorySelectorComponent 
                            categories={validCategories}
                            selectedCategoryId={selectedCategoryId}
                        />
                    ) : (
                        <div className="text-sm text-gray-500">No categories available</div>
                    )}
                </div>
                
                {/* Products grid */}
                <ProductGrid products={products} />
            </div>
        </div>
    );
};

export default ProductsView;
