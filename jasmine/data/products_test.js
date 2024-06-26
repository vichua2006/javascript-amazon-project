import { products, generate_products_html, find_product_by_id, load_products } from "../../data/products.js";

load_products(generate_products_html);

console.log(products);