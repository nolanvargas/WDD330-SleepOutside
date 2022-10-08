import { setLocalStorage } from './utils.js';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // dataSource is instance of productData class. Returns the data from the JSON file for now
    this.product = await this.dataSource.findProductById(this.productId);

    //render the information from the product using our own renderProductDetails method
    document.querySelector('main').innerHTML = this.renderProductDetails();

    //take the button in out html and add a click event which calls our own addToCart() method
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    //utils.js has several functions, one of which sets the local storage to contain some json data
    //another function can retrieve this data too.
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    //ngl I copy pasted this one. Basically we can go to our product-details.html starting at line 45
    //and strip all the html from there and replace the values dynamically using the data we have here,
    //and then return this back to the html file.
    //When doing this, it is important to make sure that the product.html file does not already
    //contain html to load, as it will load that html first, and then change them to these, causing
    //the page to load 2 different things in a split second.
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div></section>`;
  }
}
