'use client'
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/app/(store)/store/store";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderNumber');
    const clearBasket = useBasketStore((state) => state.clearBasket);

    useEffect(() => {
        if (orderNumber) {
            clearBasket();
        }
    }, [clearBasket, orderNumber]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Thank you for your order!
                </h1>
                
                {orderNumber && (
                    <div className="text-center mb-6">
                        <p className="text-gray-600 mb-2">Order Number:</p>
                        <p className="text-lg font-semibold text-gray-800">{orderNumber}</p>
                    </div>
                )}

                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-gray-600">
                            A confirmation email has been sent to your email address.
                        </p>
                        {!orderNumber && (
                            <p className="text-yellow-600 mt-2">
                                Note: Order number not found in URL parameters.
                            </p>
                        )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                            <Link href="/orders">View Order Details</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
