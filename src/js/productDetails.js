import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter,
  alertMessage,
  updateCartIcon,
  calculateDiscount,
} from "./utils.js";

loadHeaderFooter();
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector("main").innerHTML = this.renderProductDetails();
    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    // to fix the cart we need to get anything that is in the cart already.
    let cartContents = getLocalStorage("so-cart");
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }
    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    // updates the cart icon as soon as another item is put in the cart
    updateCartIcon();
  }
  renderProductDetails() {
    const discount = calculateDiscount(this.product);
    let discountDisplay = "";
    if (discount > 0) {
      discountDisplay = discount;
    }
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card_price">$${this.product.FinalPrice}</p>
    <p class="discount-rate">-${discountDisplay}%</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }
}
