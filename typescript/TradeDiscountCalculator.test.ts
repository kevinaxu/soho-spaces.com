import { TradeDiscountCalculator, PriceUSD } from './TradeDiscountCalculator'; // Assuming TradeDiscountCalculator is exported from TradeDiscountCalculator.ts

describe('TradeDiscountCalculator', () => {
    let calculator: TradeDiscountCalculator;

    beforeEach(() => {
        calculator = new TradeDiscountCalculator();
    });

    describe('addEntry', () => {
        it('should add an entry to the calculator', () => {
            const price: PriceUSD = { amount: 100, currency: 'USD' };
            const retailer = 'joybird';

            calculator.addEntry(retailer, price);

            expect(calculator['entries']).toHaveLength(1);
            expect(calculator['entries'][0]).toEqual({ price, retailer });
        });
    });

    describe('calculateTotalDiscount', () => {
        it('should calculate the correct total discount', () => {
            calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
            calculator.addEntry('article', { amount: 200, currency: 'USD' });

            const totalDiscount = calculator.calculateTotalDiscount();

            expect(totalDiscount).toBe(90); // Assuming calculated total discount
        });

        it('should return 0 when no entries are added', () => {
            const totalDiscount = calculator.calculateTotalDiscount();

            expect(totalDiscount).toBe(0);
        });
    });

    describe('calculateTotalDiscountPercentage', () => {
        it('should calculate the correct total discount percentage', () => {
            calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
            calculator.addEntry('article', { amount: 200, currency: 'USD' });
            const totalDiscountPercentage = calculator.calculateTotalDiscountPercentage();

            expect(totalDiscountPercentage).toBeCloseTo(30); // Assuming calculated total discount percentage
        });

        it('should return 0 when no entries are added', () => {
            const totalDiscountPercentage = calculator.calculateTotalDiscountPercentage();

            expect(totalDiscountPercentage).toBe(0);
        });
    });
});
