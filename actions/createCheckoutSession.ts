'use server';

import { BasketItem } from "@/app/(store)/store/store";
import stripe from "@/lib/stripe";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function getPlainText(blockContent: any): string {
    if (!blockContent) return '';
    if (typeof blockContent === 'string') return blockContent;
    if (Array.isArray(blockContent)) {
        return blockContent
            .map(block => {
                if (typeof block === 'string') return block;
                if (block?.text) return block.text;
                if (block?.children) {
                    return block.children.map((child: any) => child.text || '').join(' ');
                }
                return '';
            })
            .join(' ')
            .trim();
    }
    return '';
}

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
};

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
};

export async function createCheckoutSession(
    groupedItems: GroupedBasketItem[],
    metadata: Metadata
): Promise<string | null> {
    try {
        if (!process.env.NEXT_PUBLIC_BASE_URL) {
            throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not set");
        }

        const lineItems = await Promise.all(groupedItems.map(async (item) => {
            let imageUrl = null;
            if (item.product.image) {
                try {
                    imageUrl = builder.image(item.product.image).width(800).height(600).url();
                } catch (imgError) {
                    console.error('Error generating image URL:', imgError);
                }
            }

            const description = getPlainText(item.product.description) || `Product ID: ${item.product._id}`;

            return {
                price_data: {
                    currency: item.product.currency?.toLowerCase() || "usd",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        description: description.substring(0, 500),
                        metadata: {
                            id: item.product._id,
                        },
                        images: imageUrl ? [imageUrl] : [],
                    },
                },
                quantity: item.quantity,
            };
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/basket`,
            metadata,
            line_items: lineItems,
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA', 'AE', 'IN'],
            },
            billing_address_collection: 'required',
            payment_method_options: {
                card: {
                    setup_future_usage: 'on_session',
                }
            }
        });

        return session.url;

    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw error;
    }
}
