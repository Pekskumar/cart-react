export const CommonService = { DescountedPrice };
export function DescountedPrice(price, discountPercentage) {
  if (price !== "" && price !== null && price !== undefined) {
    let priceMain = price + price * (discountPercentage / 100);
    return priceMain?.toFixed(2);
  }
}
