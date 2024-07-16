export type PriceUSD = {
    amount: number;
    currency: 'USD';
};

export class TradeDiscountCalculator {

    private static readonly TRADE_DISCOUNTS: { [key: string]: number } = {
        "joybird": 50, 
        "article": 20,
        "crate_and_barrel": 20,
        "west_elm": 20
    }

    private entries: { retailer: string, price: PriceUSD }[] = [];

    static getDiscountForRetailer(key: string): number | undefined {
        return this.TRADE_DISCOUNTS[key];
    }

    addEntry(retailer: string, price: PriceUSD): void {
        this.entries.push({ retailer, price });
    }

    calculateTotalPrice(): number {
        let totalPrice = 0;
        this.entries.forEach(entry => {
            totalPrice += entry.price.amount;
        });
        return totalPrice;
    }

    calculateTotalDiscount(): number {
        let totalDiscount = 0;
        this.entries.forEach(entry => {
            const discount = TradeDiscountCalculator.TRADE_DISCOUNTS[entry.retailer] || 0;
            totalDiscount += entry.price.amount * (discount / 100) 
        });
        return totalDiscount;
    }

    calculateTotalDiscountPercentage(): number {
        const totalPrice = this.calculateTotalPrice();
        if (totalPrice === 0) {
            return 0;
        }
        const totalDiscount = this.calculateTotalDiscount();
        return (totalDiscount / totalPrice) * 100;
    }

    getTotalPrice(): PriceUSD {
        const totalPriceAmount = this.calculateTotalPrice();
        return {
            amount: totalPriceAmount,
            currency: 'USD'
        }
    }

    getTotalDiscount(): PriceUSD {
        const totalPriceAmount = this.calculateTotalDiscount();
        return {
            amount: totalPriceAmount,
            currency: 'USD'
        }
    }

    getTotalPriceWithDiscount(): PriceUSD {
        const totalPriceWithDiscountAmount = this.calculateTotalPrice() - this.calculateTotalDiscount();
        return {
            amount: totalPriceWithDiscountAmount,
            currency: 'USD'
        }
    }
    
    getTotalDiscountPercentage(): number {
        return this.calculateTotalDiscountPercentage();
    }
}
