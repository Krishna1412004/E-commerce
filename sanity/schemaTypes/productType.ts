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
            name: 'additionalImages',
            title: 'Additional Images',
            type: 'array',
            description: 'Add multiple images for the product carousel',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'basePrice',
            title: 'Base Price',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'variants',
            title: 'Storage/RAM Variants',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'storage',
                            title: 'Storage',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '128GB', value: '128' },
                                    { title: '256GB', value: '256' },
                                    { title: '512GB', value: '512' },
                                    { title: '1TB', value: '1024' }
                                ]
                            }
                        },
                        {
                            name: 'ram',
                            title: 'RAM',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '4GB', value: '4' },
                                    { title: '6GB', value: '6' },
                                    { title: '8GB', value: '8' },
                                    { title: '12GB', value: '12' }
                                ]
                            }
                        },
                        {
                            name: 'additionalPrice',
                            title: 'Additional Price',
                            type: 'number',
                            validation: (Rule) => Rule.required()
                        },
                        {
                            name: 'stock',
                            title: 'Stock',
                            type: 'number',
                            validation: (Rule) => Rule.required()
                        }
                    ]
                }
            ]
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
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            basePrice: 'basePrice',
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
                subtitle: `${symbol}${select.basePrice}`,
            };
        },
    },
});