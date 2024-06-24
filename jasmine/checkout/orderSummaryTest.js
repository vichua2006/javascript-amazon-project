import { render_order_summary, update_items_display } from "../../scripts/checkout/orderSummary.js";
import { load_from_storage } from "../../data/cart.js";


describe("test suite: render order summary", () => {
    // two things: how the page looks and how it behaves
    // create html element to load the summary 
    it("displays the cart", () => {

        document.querySelector(".js-test-container").innerHTML = `
            <div class="js-order-summary"></div>
        `;

        // mock localStorage.getItem storage as may interfere with tests
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
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
            ]);
        });

        // now load cart 
        load_from_storage();

        // render page
        render_order_summary();

        // check length
        expect(
            document.querySelectorAll(".cart-item-container").length
        ).toEqual(2);

    });
});