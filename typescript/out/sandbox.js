"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TradeDiscountCalculator_1 = require("./TradeDiscountCalculator"); // Assuming TradeDiscountCalculator is exported from TradeDiscountCalculator.ts
// Example usage
var calculator = new TradeDiscountCalculator_1.TradeDiscountCalculator();
// Add entries
// calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
// calculator.addEntry('article', { amount: 200, currency: 'USD' }, );
// calculator.addEntry('crate_and_barrel', { amount: 150, currency: 'USD' });
calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
calculator.addEntry('article', { amount: 200, currency: 'USD' });
// Get and print totals
var totalPriceWithDiscount = calculator.getTotalPriceWithDiscount();
var totalPrice = calculator.getTotalPrice();
var totalDiscountPercentage = calculator.calculateTotalDiscountPercentage();
var totalDiscountAmount = calculator.getTotalDiscount();
console.log("Total price: ".concat(totalPrice.amount, " ").concat(totalPrice.currency)); // Output: Total price: 450 USD
console.log("Total discount amount: ".concat(totalDiscountAmount.amount));
console.log("Total price with discount: ".concat(totalPriceWithDiscount.amount, " ").concat(totalPriceWithDiscount.currency)); // Output: Total discount: 120 USD
console.log("Total discount %: ".concat(totalDiscountPercentage));
