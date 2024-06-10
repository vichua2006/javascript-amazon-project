import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

function generate_products_html() {
    let combined_product_html = "";
    products.forEach((product) => {
        const product_html = `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${product.priceCents / 100}
                </div>

                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `

        combined_product_html += product_html;
    });

    return combined_product_html;
}

function add_to_cart(product_id){
    for (const item of cart){
        if (item.id === product_id){
            item.quantity += 1;
            return;
        }
    }

    cart.push({
        id: product_id,
        quantity: 1,
    });
}

function update_cart_quantity(){
    let quantity = 0;
    for (const item of cart) quantity += item.quantity;
    document.querySelector(".js-cart-quantity").innerHTML = quantity;
}

document.querySelector(".js-products-grid").innerHTML = generate_products_html();

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
        add_to_cart(button.dataset.productId);
        console.log(cart);
        update_cart_quantity();
    });
});

// let button = document.querySelector('.add-to-cart-button');
// console.log(button);

// button.addEventListener('click', () => {
//     button.classList.add('opaque');
// });


// function show_added_icon(button){
//     console.log('working')
//     button.classList.add('opaque');
// }