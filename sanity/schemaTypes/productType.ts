import { TrolleyIcon } from "@sanity/icons";
import { preconnect } from "react-dom";
import { defineField, defineType } from "sanity";

export const productType = defineType( {
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'currency',
            title: 'Currency',
            type: 'string',
            initialValue: 'inr',
            options: {
                list: [
                    {title: 'INR (₹)', value: 'inr'},
                    {title: 'USD ($)', value: 'usd'},
                    {title: 'GBP (£)', value: 'gbp'},
                    {title: 'EUR (€)', value: 'eur'}
                ]
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            price: 'price',
            currency: 'currency'
        },
        prepare(select) {
            const currencySymbols: { [key: string]: string } = {
                inr: '₹',
                usd: '$',
                gbp: '£',
                eur: '€'
            };
            const symbol = currencySymbols[select.currency] || select.currency;
            return {
                title: select.title,
                media: select.media,
                subtitle: `${symbol}${select.price}`,
            };
        },
    },
});