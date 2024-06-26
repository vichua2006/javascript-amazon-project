import render_order_summary from "./checkout/orderSummary.js";
import { render_payment_summary } from "./checkout/paymentSummary.js";
import { load_products } from "../data/products.js";

// using callbacks to render page after products have loaded
load_products(() => {
    render_order_summary();
    render_payment_summary();
});