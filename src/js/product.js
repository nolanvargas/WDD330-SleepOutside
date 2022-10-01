import ProductData from "./productData.js";
import { getParams } from "./utils.js";
import ProductDetails from "./productDetails.js";


const dataSource = new ProductData('tents');
const productId = getParams('product')
const product = new ProductDetails(productId, dataSource)
console.log(await dataSource.findProductById(productId));
product.init()

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


// add to cart button event handler
function addToCart(e) {
  const product = products.find((item) => item.Id === e.target.dataset.id);
  setLocalStorage('so-cart', product);
}

