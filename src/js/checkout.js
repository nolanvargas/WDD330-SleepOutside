import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./CheckoutProcess.js";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();
// When the zip element loses focus (blur) then the order is calculated (caluclateOrdertotal)
document
  .querySelector("#zip")
  // calculates and displays order total
  .addEventListener("blur", myCheckout.calculateOrdertotal);
// 1.
// this is how it would look if we listen for the click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  // Prevent the form from changing pages
  e.preventDefault();
  // Read-only returns the first (and only in this case) form in the page
  const myForm = document.forms[0];
  // Form.checkValidity returns true if an input element contains valid data.
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) myCheckout.checkout();
});

// 2.
// this is how it would look if we listen for the submit on the form
// document.forms['checkout']
// .addEventListener('submit', (e) => {
//   e.preventDefault();
//   // e.target would contain our form in this case
//    myCheckout.checkout();
// });
