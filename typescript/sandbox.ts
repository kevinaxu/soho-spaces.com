import { TradeDiscountCalculator, PriceUSD } from './TradeDiscountCalculator'; // Assuming TradeDiscountCalculator is exported from TradeDiscountCalculator.ts

// Example usage
const calculator = new TradeDiscountCalculator();

// Add entries
// calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
// calculator.addEntry('article', { amount: 200, currency: 'USD' }, );
// calculator.addEntry('crate_and_barrel', { amount: 150, currency: 'USD' });

calculator.addEntry('joybird', { amount: 100, currency: 'USD' });
calculator.addEntry('article', { amount: 200, currency: 'USD' });

// Get and print totals
const totalPriceWithDiscount = calculator.getTotalPriceWithDiscount();
const totalPrice    = calculator.getTotalPrice();
const totalDiscountPercentage = calculator.calculateTotalDiscountPercentage();
const totalDiscountAmount = calculator.getTotalDiscount();
console.log(`Total price: ${totalPrice.amount} ${totalPrice.currency}`);  // Output: Total price: 450 USD
console.log(`Total discount amount: ${totalDiscountAmount.amount}`);  
console.log(`Total price with discount: ${totalPriceWithDiscount.amount} ${totalPriceWithDiscount.currency}`);  // Output: Total discount: 120 USD
console.log(`Total discount %: ${totalDiscountPercentage}`)
