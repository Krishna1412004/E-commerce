'use client';

import { Product } from "@/sanity/types";
import AddToBasketButton from "./AddToBasketButton";

interface AddToBasketWrapperProps {
    product: Product;
    disabled: boolean;
}

function AddToBasketWrapper({ product, disabled }: AddToBasketWrapperProps) {
    return <AddToBasketButton product={product} disabled={disabled} />;
}

export default AddToBasketWrapper; 