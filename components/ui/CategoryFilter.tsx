"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug === "all") {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }
    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <span>Filter by category</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <button
            onClick={() => handleCategorySelect("all")}
            className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategorySelect(category.slug)}
              className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {category.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 