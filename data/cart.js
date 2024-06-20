export var cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
    cart = [
        {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 2,
            delivery_options: "1",
        }, 
        {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            delivery_options: "2",
        }
    ];
}

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
        // option 1 as default
        delivery_options: "1",
    });

    save_to_storage();
}

export function update_cart_quantity(){
    document.querySelector(".js-cart-quantity").innerHTML = compute_cart_quantity();
}

export function remove_from_cart(product_id){
    let idx = -1;
    for (let i=0;i<cart.length;i++){
        if (cart[i].id === product_id){
            idx = i;
            break;
        }
    }

    if (idx > -1) cart.splice(idx, 1);
    save_to_storage();
}

export function save_to_storage(){
    const cart_json = JSON.stringify(cart);
    localStorage.setItem('cart', cart_json);
}

export function compute_cart_quantity(){
    let quantity = 0;
    for (const item of cart) quantity += item.quantity;
    return quantity;
}

export function change_item_quantity_by_id(id, new_quantity){
    for (let item of cart){
        if (item.id === id){
            item.quantity = new_quantity;
            return;
        }
    }

    save_to_storage();
}