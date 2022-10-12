import ProductData from './productData.js';
import ProductListing from './productList.js';

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const myList = new ProductListing('tents', dataSource, listElement);

myList.init();