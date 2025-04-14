export function formatcurrency(
    amount: number, 
    currencyCode: string,
): string{
   try{
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode.toUpperCase(),
    }).format(amount);
   }catch(error){
    console.error("Error formatting currency",currencyCode, error);
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
   }
}