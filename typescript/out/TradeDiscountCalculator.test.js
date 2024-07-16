"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TradeDiscountCalculator_1 = require("./TradeDiscountCalculator"); // Assuming TradeDiscountCalculator is exported from TradeDiscountCalculator.ts
describe('TradeDiscountCalculator', function () {
    var calculator;
    beforeEach(function () {
        calculator = new TradeDiscountCalculator_1.TradeDiscountCalculator();
    });
    describe('addEntry', function () {
        it('should add an entry to the calculator', function () {
            var price = { amount: 100, currency: 'USD' };
            var retailer = 'joybird';
            calculator.addEntry(retailer, price);
            expect(calculator['entries']).toHaveLength(1);
            expect(calculator['entries'][0]).toEqual({ price: price, retailer: retailer });
        });
    });
    describe('calculateTotalDiscount', function () {
        it('should calculate the correct total discount', function () {
            calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
            calculator.addEntry('article', { amount: 200, currency: 'USD' });
            var totalDiscount = calculator.calculateTotalDiscount();
            expect(totalDiscount).toBe(90); // Assuming calculated total discount
        });
        it('should return 0 when no entries are added', function () {
            var totalDiscount = calculator.calculateTotalDiscount();
            expect(totalDiscount).toBe(0);
        });
    });
    describe('calculateTotalDiscountPercentage', function () {
        it('should calculate the correct total discount percentage', function () {
            calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
            calculator.addEntry('article', { amount: 200, currency: 'USD' });
            var totalDiscountPercentage = calculator.calculateTotalDiscountPercentage();
            expect(totalDiscountPercentage).toBeCloseTo(30); // Assuming calculated total discount percentage
        });
        it('should return 0 when no entries are added', function () {
            var totalDiscountPercentage = calculator.calculateTotalDiscountPercentage();
            expect(totalDiscountPercentage).toBe(0);
        });
    });
});
