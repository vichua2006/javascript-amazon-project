import { products, generate_products_html, load_products} from "../data/products.js";
import { cart, add_to_cart, update_cart_quantity } from "../data/cart.js";


function show_added(product_id, timeout_id){
    const icon_element = document.querySelector(`.js-added-to-cart-${product_id}`);
    icon_element.classList.add('opaque');

    if (timeout_id != null) clearTimeout(timeout_id);
    timeout_id = setTimeout(() => {
        icon_element.classList.remove('opaque');
    }, 2000);

    return timeout_id;
}

function main() {
    load_products(generate_products_html);
    update_cart_quantity();

    document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
        let timeout_id = null;
        button.addEventListener("click", () => {
            add_to_cart(button.dataset.productId);
            update_cart_quantity();
            timeout_id = show_added(button.dataset.productId, timeout_id);
        });
    });
}


main();