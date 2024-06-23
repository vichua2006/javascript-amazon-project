import { cart, compute_cart_quantity } from "../../data/cart.js";
import { find_product_by_id } from "../../data/products.js"
import { find_delivery_option_by_id} from "../../data/deliveryOptions.js";
import { format_currency } from "../utils/money.js";

export function render_payment_summary() {

    let product_price_cents = 0;
    let shipping_cost_cents = 0;

    cart.forEach((item) => {
        const { id, quantity, delivery_options } =  item;
        const matching_product = find_product_by_id(id);
        const matching_delivery_option = find_delivery_option_by_id(delivery_options);


        const price_cents = matching_product.priceCents * quantity;
        product_price_cents += price_cents;
        shipping_cost_cents += matching_delivery_option.priceCent;
    });

    const total_before_tax_cents = product_price_cents + shipping_cost_cents;
    const tax_cents = total_before_tax_cents * 0.1;
    const total_cents = total_before_tax_cents + tax_cents;

    const payment_summary_html = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${compute_cart_quantity()}):</div>
            <div class="payment-summary-money">$${format_currency(product_price_cents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${format_currency(shipping_cost_cents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${format_currency(total_before_tax_cents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${format_currency(tax_cents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${format_currency(total_cents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;
    
    document.querySelector(".js-payment-summary").innerHTML = payment_summary_html;

    return;
}