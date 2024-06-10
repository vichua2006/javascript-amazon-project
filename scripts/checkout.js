import { cart, remove_from_cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { format_currency } from "./utils/money.js";

function find_product_by_id(product_id) {
    for (const product of products){
        if (product.id === product_id) return product;
    }

    return false;
}

function generate_checkout_products_html() {

    let combined_html = "";
    cart.forEach((cart_item) => {
        const item_id = cart_item.id;
        const matching_product = find_product_by_id(item_id);
        // if (!matching_product) continue; // can't because it's a forEach iteration
        
        const product_html = `
            <div class="cart-item-container js-cart-item-container-${matching_product.id}">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matching_product.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matching_product.name}
                    </div>
                    <div class="product-price">
                    $${format_currency(matching_product.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cart_item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matching_product.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matching_product.id}">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matching_product.id}">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matching_product.id}">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `

        combined_html += product_html;
    });

    return combined_html;
}

function render_checkout_page(){
    document.querySelector(".js-order-summary").innerHTML = generate_checkout_products_html();
}

render_checkout_page();

document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const product_id = link.dataset.productId;
            remove_from_cart(product_id);

            const container = document.querySelector(`.js-cart-item-container-${product_id}`)
            container.remove();
        });
    });