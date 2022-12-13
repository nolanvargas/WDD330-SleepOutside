import { loadHeaderFooter } from "./utils.js";
import CartList from "./cartList.js";

loadHeaderFooter();

// so-cart is our localstorage key, and product-list is our location in the HTML
const cart = new CartList("so-cart", document.querySelector(".product-list"));
cart.init();
//check to see if there is anything in the cart...
if (cart.total > 0) {
  // show our checkout button and total if there are items in the cart.
  document.querySelector(".list-footer").classList.remove("hide");
}
