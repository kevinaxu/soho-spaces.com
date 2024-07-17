export type PriceUSD = {
    amount: number;
    currency: 'USD';
};
export declare class TradeDiscountCalculator {
    private static readonly TRADE_DISCOUNTS;
    private entries;
    static getDiscountForRetailer(key: string): number | undefined;
    addEntry(retailer: string, price: PriceUSD): void;
    calculateTotalPrice(): number;
    calculateTotalDiscount(): number;
    calculateTotalDiscountPercentage(): number;
    getTotalPrice(): PriceUSD;
    getTotalDiscount(): PriceUSD;
    getTotalPriceWithDiscount(): PriceUSD;
    getTotalDiscountPercentage(): number;
}
