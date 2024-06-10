export const cart = [];

export function add_to_cart(product_id){
    const select_element = document.querySelector(`.js-product-quantity-select[data-product-id="${product_id}"]`);
    const selected_quantity = parseInt(select_element.value);
    for (const item of cart){
        if (item.id === product_id){
            item.quantity += selected_quantity;
            return;
        }
    }

    cart.push({
        id: product_id,
        quantity: selected_quantity,
    });
}

export function update_cart_quantity(){
    let quantity = 0;
    for (const item of cart) quantity += item.quantity;
    document.querySelector(".js-cart-quantity").innerHTML = quantity;
}