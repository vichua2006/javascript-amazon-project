export const cart = [
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
    }, 
    // {
    //     id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //     quantity: 1,
    // }
];

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