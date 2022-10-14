import ProductData from './productData.js';
import { getParams } from './utils.js';
import ProductDetails from './productDetails.js';

const dataSource = new ProductData('tents');
const productId = getParams('product');
const product = new ProductDetails(productId, dataSource);
product.init();
