console.log('Starting...');

import { fetchProducts } from './woocommerce';

async function main() {
  try {
    const products = await fetchProducts();
    console.log('Products:', products);
  } catch (error) {
    console.error('Main error:', error);
  }
}

main();
