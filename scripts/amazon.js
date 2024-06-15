import { products, generate_products_html } from "../data/products.js";
import { cart, add_to_cart, update_cart_quantity } from "../data/cart.js";


function show_added(product_id){
    const icon_element = document.querySelector(`.js-added-to-cart-${product_id}`);
    console.log(icon_element);
    icon_element.classList.add('opaque');

    if (timeout_id != null) clearTimeout(timeout_id);
    timeout_id = setTimeout(() => {
        icon_element.classList.remove('opaque');
    }, 2000);
}

var timeout_id = null;

function main() {
    document.querySelector(".js-products-grid").innerHTML = generate_products_html();
    update_cart_quantity();

    document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
        button.addEventListener("click", () => {
            add_to_cart(button.dataset.productId);
            update_cart_quantity();
            show_added(button.dataset.productId);
        });
    });
}


main();