"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import useBasketStore from "../store/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AddToBasketButton from "@/components/ui/AddToBasketButton";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { createCheckoutSession, Metadata as CheckoutMetadata } from "@/actions/createCheckoutSession";
import toast from "react-hot-toast";

const builder = imageUrlBuilder(client);

function BasketPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
                <p className="text-gray-600 text-lg">Your basket is empty</p>
            </div>
        );
    }

    const handleCheckout = async () => {
        if (!isSignedIn) {
            toast.error("Please sign in to checkout");
            return;
        }

        if (!user?.emailAddresses[0]?.emailAddress) {
            toast.error("No email address found. Please update your profile.");
            return;
        }

        setIsLoading(true);
        const toastId = toast.loading("Creating checkout session...");

        try {
            const metadata: CheckoutMetadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress,
                clerkUserId: user?.id ?? "Unknown",
            };
            
            try {
                const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
                if (checkoutUrl) {
                    toast.success("Redirecting to checkout...", { id: toastId });
                    window.location.href = checkoutUrl;
                } else {
                    toast.error("Failed to create checkout session. Please try again.", { id: toastId });
                }
            } catch (error: any) {
                console.error("Stripe error:", error);
                const errorMessage = error.raw?.message || error.message || "An error occurred during checkout.";
                toast.error(errorMessage, { id: toastId });
            }
        } catch (error: any) {
            console.error("Error during checkout:", error);
            toast.error("An unexpected error occurred. Please try again.", { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
            <div className="flex flex-col gap-8 lg:flex-row">
                <div className="flex-grow">
                    {groupedItems?.map((item) => (
                        <div
                            key={item.product._id}
                            className="mb-4 p-4 border rounded flex items-center justify-between"
                        >
                            <div
                                className="flex items-center cursor-pointer flex-1 min-w-0"
                                onClick={() =>
                                    router.push(`/product/${item.product.slug}`)
                                }
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                                    {item.product.image && (
                                        <Image
                                            src={builder.image(item.product.image).url()}
                                            alt={item.product.name ?? "Product Image"}
                                            className="w-full h-full object-cover rounded"
                                            width={96}
                                            height={96}
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg font-semibold sm:text-xl truncate">
                                        {item.product.name}
                                    </h2>
                                    <p className="sm:text-base text-sm">
                                        Price: {item.product.currency === 'inr' ? '₹' : item.product.currency === 'usd' ? '$' : item.product.currency === 'gbp' ? '£' : '€'}
                                        {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center ml-4 flex-shrink-0">
                                <AddToBasketButton product={item.product} disabled={false} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded
                order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <div className="mt-4 space-y-2">
                <p className="flex justify-between">
                    <span>Items</span>
                    <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                    </p>
                    <p className="flex justify-between text-2xl font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>
                            {groupedItems[0]?.product.currency === 'inr' ? '₹' : 
                             groupedItems[0]?.product.currency === 'usd' ? '$' : 
                             groupedItems[0]?.product.currency === 'gbp' ? '£' : '€'}
                            {useBasketStore.getState().getTotalPrice().toFixed(2)}
                        </span>
                    </p>                        
                </div>
                {isSignedIn ? (
                    <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                    {isLoading ? "Processing..." : "Checkout"}
                    </button>
                ) : (
                    <SignInButton mode="modal">
                        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded
                    hover:bg-blue-600">Sign In to Checkout</button>
                    </SignInButton>
                )}
                </div>

                <div className="h:64 lg:h-0">
                    {/*Spacer For Fixed Checkout On Mobile*/}
                </div>
            </div>
        </div>
    );
}

export default BasketPage; 