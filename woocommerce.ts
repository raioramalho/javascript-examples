import axios from 'axios';

interface OAuthConfig {
  algorithm: string;
  key: string;
  secret: string;
}

function addOAuthInterceptor(client: any, config: OAuthConfig) {
  // Implement your OAuth logic here
  // You'll need to sign the requests using HMAC-SHA1
  // and set the proper headers for authentication
}

const WooCommerceAPI = axios.create({
  baseURL: 'https://loja.dispandovale.com.br/wp-json/wc/v3', // Replace with your store URL
});

addOAuthInterceptor(WooCommerceAPI, {
  algorithm: 'HMAC-SHA1',
  key: 'ck_80940d47a22c04b0137520b6cb628ae075388270', // Replace with your consumer key
  secret: 'cs_899c07b60dddccf0a7bfad048378a5a6e32be835', // Replace with your consumer secret
});

export async function fetchProducts() {
  try {
    const response = await WooCommerceAPI.get('/products/20041');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products:', error.response.data);

  }
}


// import { fetchProducts } from './woocommerce';

// async function main() {
//   try {
//     const products = await fetchProducts();
//     console.log('Products:', products);
//   } catch (error) {
//     console.error('Main error:', error);
//   }
// }

// main();
