import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import useBasketStore from "@/app/(store)/store/store";
import { BasketItem } from "@/app/(store)/store/store";

export function BasketButton() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const itemCount = groupedItems.reduce((total: number, item: BasketItem) => total + item.quantity, 0);

  return (
    <Link href="/basket" className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Shopping basket"
      >
        <ShoppingBasket className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </Link>
  );
} 