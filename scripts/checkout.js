import { cart, remove_from_cart, compute_cart_quantity, change_item_quantity_by_id, update_delivery_option } from "../data/cart.js";
import { products } from "../data/products.js";
import { format_currency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { delivery_options } from "../data/deliveryOptions.js";

function find_product_by_id(product_id) {
    for (const product of products){
        if (product.id === product_id) return product;
    }

    return false;
}

function n_days(days){
    const today = dayjs();
    const new_date = today.add(days, "days");
    const date_string = new_date.format("dddd, MMMM D");
    return date_string;
}

function generate_checkout_products_html() {

    let combined_html = "";
    cart.forEach((cart_item) => {
        const item_id = cart_item.id;
        const matching_product = find_product_by_id(item_id);
        // if (!matching_product) continue; // can't because it's a forEach iteration

        let delivery_option;
        for (let option of delivery_options){
            if (cart_item.delivery_options === option.id){
                delivery_option = option;
            }
        }

        const day_string = n_days(delivery_option.delivery_days);
        
        const product_html = `
            <div class="cart-item-container js-cart-item-container-${matching_product.id}">
                <div class="delivery-date">
                Delivery date: ${day_string}
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
                            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matching_product.id}">
                                Update
                            </span>

                            <input class="quantity-input js-quantity-input-${matching_product.id}">

                            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matching_product.id}">
                                Save
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

                        ${generate_delivery_options_html(matching_product, cart_item)}
                        
                    </div>
                </div>
            </div>
        `

        combined_html += product_html;
    });

    return combined_html;
}

function generate_delivery_options_html(matching_product, cart_item){

    let combined_html = "";

    delivery_options.forEach((option) => {

        const date_string = n_days(option.delivery_days);
        // using terinary operator to determine if radio selector should be checked
        const new_html = 
        `
            <div class="delivery-option js-delivery-option" data-product-id="${matching_product.id}" data-delivery-id="${option.id}">
                <input type="radio" 
                ${(option.id === cart_item.delivery_options ? "checked" : "")}
                class="delivery-option-input"
                name="delivery-option-${matching_product.id}">

                <div>
                    <div class="delivery-option-date">
                        ${date_string}
                    </div>
                    <div class="delivery-option-price">
                        ${(option.priceCent === 0 ? "FREE" : `$${format_currency(option.priceCent)}`)}
                    </div>
                </div>
            </div>
        `

        combined_html += new_html;
    });

    return combined_html;
}

function render_checkout_page(){
    document.querySelector(".js-order-summary").innerHTML = generate_checkout_products_html();
    update_items_display();
}

function update_items_display(){
    const checkout_header = document.querySelector(".js-checkout-header-text");
    checkout_header.innerHTML = `${compute_cart_quantity()} items`;
}

function add_all_listeners(){
    // adding listeners to delete link
    document.querySelectorAll(".js-delete-link")
        .forEach((link) => {
            link.addEventListener("click", () => {
                // removing item from cart
                const product_id = link.dataset.productId;
                remove_from_cart(product_id);
                
                // removing html element
                const container = document.querySelector(`.js-cart-item-container-${product_id}`)
                container.remove();

                update_items_display();
                // also possible delete from carte and re-render, but this bit of code must be placed in the render function
            });
        });

    // adding listeners to update link
    document.querySelectorAll(".js-update-link")
        .forEach((link) => {
            link.addEventListener("click", () => {
                const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`);

                container.classList.add("is-editing-quantity");
            });
        });

    // adding event listeners to all save links
    document.querySelectorAll(".js-save-link")
        .forEach((link) => {
            link.addEventListener("click", () => {
                const product_id = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${product_id}`);

                container.classList.remove("is-editing-quantity");

                const input_elem = document.querySelector(`input.js-quantity-input-${product_id}`);

                const new_quantity = parseInt(input_elem.value);

                change_item_quantity_by_id(product_id, new_quantity);

                update_items_display();
            });
        });

    // adding event listeners for delivery options
    document.querySelectorAll(".js-delivery-option")
        .forEach((option) => {
            option.addEventListener("click", () => {
                const product_id = option.dataset.productId;
                const od_id = option.dataset.deliveryId;  
                update_delivery_option(product_id, od_id);
            });
        });
}



function main(){
    render_checkout_page();
    add_all_listeners();

}

main();