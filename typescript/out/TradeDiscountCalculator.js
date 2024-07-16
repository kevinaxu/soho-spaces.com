"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeDiscountCalculator = void 0;
var TradeDiscountCalculator = /** @class */ (function () {
    function TradeDiscountCalculator() {
        this.entries = [];
    }
    TradeDiscountCalculator.getDiscountForRetailer = function (key) {
        return this.TRADE_DISCOUNTS[key];
    };
    TradeDiscountCalculator.prototype.addEntry = function (retailer, price) {
        this.entries.push({ retailer: retailer, price: price });
    };
    TradeDiscountCalculator.prototype.calculateTotalPrice = function () {
        var totalPrice = 0;
        this.entries.forEach(function (entry) {
            totalPrice += entry.price.amount;
        });
        return totalPrice;
    };
    TradeDiscountCalculator.prototype.calculateTotalDiscount = function () {
        var totalDiscount = 0;
        this.entries.forEach(function (entry) {
            var discount = TradeDiscountCalculator.TRADE_DISCOUNTS[entry.retailer] || 0;
            totalDiscount += entry.price.amount * (discount / 100);
        });
        return totalDiscount;
    };
    TradeDiscountCalculator.prototype.calculateTotalDiscountPercentage = function () {
        var totalPrice = this.calculateTotalPrice();
        if (totalPrice === 0) {
            return 0;
        }
        var totalDiscount = this.calculateTotalDiscount();
        return (totalDiscount / totalPrice) * 100;
    };
    TradeDiscountCalculator.prototype.getTotalPrice = function () {
        var totalPriceAmount = this.calculateTotalPrice();
        return {
            amount: totalPriceAmount,
            currency: 'USD'
        };
    };
    TradeDiscountCalculator.prototype.getTotalDiscount = function () {
        var totalPriceAmount = this.calculateTotalDiscount();
        return {
            amount: totalPriceAmount,
            currency: 'USD'
        };
    };
    TradeDiscountCalculator.prototype.getTotalPriceWithDiscount = function () {
        var totalPriceWithDiscountAmount = this.calculateTotalPrice() - this.calculateTotalDiscount();
        return {
            amount: totalPriceWithDiscountAmount,
            currency: 'USD'
        };
    };
    TradeDiscountCalculator.prototype.getTotalDiscountPercentage = function () {
        return this.calculateTotalDiscountPercentage();
    };
    TradeDiscountCalculator.TRADE_DISCOUNTS = {
        "joybird": 50,
        "article": 20,
        "crate_and_barrel": 20,
        "west_elm": 20
    };
    return TradeDiscountCalculator;
}());
exports.TradeDiscountCalculator = TradeDiscountCalculator;
