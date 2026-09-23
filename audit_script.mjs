import { PRODUCTS } from './src/data/products.js';
import { IPHONE_MODELS } from './src/data/categories.js';

const models = IPHONE_MODELS.filter(m => m.id !== 'all');

console.log('================================================================');
console.log('COMPREHENSIVE AUDIT: 15 IPHONE MODELS x 2 CASES = 30 PRODUCTS');
console.log('================================================================\n');

models.forEach((m, idx) => {
  const cases = PRODUCTS.filter(p => p.targetModel && p.targetModel.toLowerCase() === m.name.toLowerCase());
  console.log(`[${idx + 1}] ${m.name} (${m.screen}) - Series: ${m.series}`);
  cases.forEach((c, cIdx) => {
    console.log(`   * Case ${cIdx + 1}: ${c.name}`);
    console.log(`     ID: ${c.id} | Price: ₹${c.price} (Original: ₹${c.originalPrice}) | Badge: ${c.badge}`);
    console.log(`     Image: ${c.image}`);
    console.log(`     Colors (${c.colors.length}): ${c.colors.map(col => col.name).join(', ')}`);
  });
  console.log('');
});

console.log('================================================================');
console.log('ECOSYSTEM ACCESSORIES (6 PRODUCTS)');
console.log('================================================================');
const accessories = PRODUCTS.filter(p => !p.targetModel);
accessories.forEach((a, aIdx) => {
  console.log(`[${aIdx + 1}] ${a.name} | ₹${a.price} | Category: ${a.category} | Image: ${a.image}`);
});
