import { getProducts } from "@/sanity/lib/products/getProducts";
import ProductsView from "@/components/ProductsView";
import { getCategories } from "@/sanity/lib/categories/getCategories";
import BlackFridayBanner from "@/components/ui/BlackFridayBanner";
import CategoryFilter from "@/components/ui/CategoryFilter";
import { CategorySelectorComponent } from "@/components/ui/category-selector";
export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BlackFridayBanner />
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Latest Products</h1>
            <CategorySelectorComponent categories={categories} />
          </div>
          <ProductsView products={products || []} categories={categories || []} />
        </div>
      </div>
    </div>
  );
}
