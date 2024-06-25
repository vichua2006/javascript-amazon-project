class Cart {
    cart_items;
    // # private declaration
    #local_storage_key;

    constructor(storage_key) {
        this.#local_storage_key = storage_key;
        this.#load_from_storage();
    }

    #load_from_storage() {
        this.cart_items = JSON.parse(localStorage.getItem(this.#local_storage_key));
        
        if (!this.cart_items) {
            // default values
            this.cart_items = [
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
    }

    #save_to_storage(){
        const cart_json = JSON.stringify(this.cart_items);
        localStorage.setItem(this.#local_storage_key, cart_json);
    }
    

    add_to_cart(product_id){
        const select_element = document.querySelector(`.js-product-quantity-select[data-product-id="${product_id}"]`);
        const selected_quantity = parseInt(select_element.value);
        let exists = false;
        for (const item of this.cart_items){
            if (item.id === product_id){
                item.quantity += selected_quantity;
                exists = true;
                break;
            }
        }
    
        if (!exists){
            this.cart_items.push({
                id: product_id,
                quantity: selected_quantity,
                // option 1 as default
                delivery_options: "1",
            });
        }
    
        this.this.#save_to_storage();
    }

    update_cart_quantity(){
        document.querySelector(".js-cart-quantity").innerHTML = compute_cart_quantity();
    }
    
    remove_from_cart(product_id){
        let idx = -1;
        for (let i=0;i<this.cart_items.length;i++){
            if (this.cart_items[i].id === product_id){
                idx = i;
                break;
            }
        }
    
        if (idx > -1) this.cart_items.splice(idx, 1);
        this.#save_to_storage();
    }

    compute_cart_quantity(){
        let quantity = 0;
        for (const item of this.cart_items) quantity += item.quantity;
        return quantity;
    }
    
    change_item_quantity_by_id(id, new_quantity){
        for (let item of this.cart_items){
            if (item.id === id){
                item.quantity = new_quantity;
                return;
            }
        }
    
        this.#save_to_storage();
    }
    
    update_delivery_option(product_id, delivery_option_id){
        let matching_item;
        for (let item of cart){
            if (item.id === product_id){
                matching_item = item;
                break;
            }
        }
        
        matching_item.delivery_options = delivery_option_id;
        // updated carte, thus update storage;
        this.#save_to_storage();
        return;
    }
    
}


const cart = new Cart("cart-class");

console.log(cart);