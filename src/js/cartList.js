import { renderListWithTemplate, getLocalStorage } from "./utils.js";

export default class CartList {
  constructor(key, listElement) {
    // key: the key from local storage that has our cart
    // listElement: the place where we are going to populate with a list
    this.key = key;
    this.listElement = listElement;
    this.total = 0;
  }

  async init() {
    // Grab the cart values
    const list = getLocalStorage(this.key);
    // If list exists..
    if (list) {
      // Send the list to our calculateListTotal method.
      this.calculateListTotal(list);
      // Populate the list element with our data
      this.renderList(list);
    }
  }

  // This is used as a callback function elsewhere
  // that fills in the data into the template
  prepareTemplate(template, product) {
    template.querySelector(".cart-card__image img").src =
      product.Images.PrimaryMedium;
    template.querySelector(".cart-card__image img").alt += product.Name;
    template.querySelector(".card__name").textContent = product.Name;
    template.querySelector(".cart-card__color").textContent =
      product.Colors[0].ColorName;
    template.querySelector(".cart-card__price").textContent +=
      product.FinalPrice;
    return template;
  }

  calculateListTotal(list) {
    // Get the amount from each item and stores it in the array
    // map() -> go through each item and return something
    // forEach() same thing but nothing is explicitly returned
    const amounts = list.map((item) => item.FinalPrice);
    // Sums the total for each item in the amounts list
    // reduce() adds each return and sends it back when its done
    this.total = amounts.reduce((sum, item) => sum + item, 0);
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = "";
    //get the template
    const template = document.getElementById("cart-card-template");
    // template is the html template element
    // this.listElement is the element that we are going to populate
    // list was passed in as an argument
    // this.prepareTemplate is our callback function (method here)
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
    // Plug the total into our total element
    document.querySelector(".list-total").innerText += ` $${this.total}`;
  }
}
