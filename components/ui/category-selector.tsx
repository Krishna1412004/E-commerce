"use client"
import { useState } from "react";
import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

interface CategorySelectorProps {
    categories: Category[];
};
export function CategorySelectorComponent({ categories, }: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const router = useRouter();
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Filter by Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 border-gray-200 dark:border-gray-800">
                <Command className="bg-white dark:bg-gray-950">
                    <CommandInput placeholder="Search Category..." className="h-9" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const selectedCategory = categories.find((c) =>
                                c.title
                                    ?.toLowerCase()
                                    .includes(e.currentTarget.value.toLowerCase())
                            );
                            
                            // Handle both slug formats
                            const slugValue = selectedCategory && (
                                typeof selectedCategory.slug === 'string' 
                                    ? selectedCategory.slug 
                                    : selectedCategory.slug?.current
                            );
                            
                            if (slugValue) {
                                setValue(selectedCategory._id)
                                router.push(`/categories/${slugValue}`);
                                setOpen(false);
                            }
                        }
                    }} />
     
                    <CommandList className="dark:bg-gray-950 dark:text-gray-200">
                        <CommandEmpty className="dark:text-gray-400">No Category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    className="dark:text-gray-200 dark:hover:bg-gray-800"
                                    onSelect={() => {
                                        console.log("Selected category:", category);
                                        console.log("Slug:", category.slug);
                                        setValue(value === category._id ? "" : category._id);
                                        
                                        // Handle both slug formats
                                        const slugValue = typeof category.slug === 'string' 
                                            ? category.slug 
                                            : category.slug?.current;
                                            
                                        if (slugValue) {
                                            router.push(`/categories/${slugValue}`);
                                        } else {
                                            console.log("No valid slug found for category:", category.title);
                                        }
                                        setOpen(false);
                                    }}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}