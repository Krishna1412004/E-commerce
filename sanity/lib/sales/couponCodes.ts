export const couponCodes = {
    BFRIDAY: "BFRIDAY",
    XMAS2024: "XMAS2024",
    NEWYEAR2025: "NEWYEAR2025",
} as const;

export type CouponCode = keyof typeof couponCodes;


