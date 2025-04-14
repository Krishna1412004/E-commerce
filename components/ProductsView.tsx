import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { formatCurrency } from "@/lib/utils";
import { Image } from "sanity";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Product {
  _id: string;
  name: string;
  description?: any; // Sanity block content
  price: number;
  slug: string;
  image?: Image;
  category?: Category;
}

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const getPlainText = (blocks: any[] = []): string => {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map(block => {
      if (typeof block === 'string') return block;
      if (block?.text) return block.text;
      if (block?.children) {
        return block.children.map((child: any) => child.text || '').join('');
      }
      return '';
    })
    .join(' ')
    .trim();
};

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/product/${product.slug}`}
          className="group"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-900">
              {product.image && (
                <img
                  src={urlForImage(product.image).url()}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {getPlainText(product.description)}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(product.price)}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.category?.name}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsView; 