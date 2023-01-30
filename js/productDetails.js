var s=(c,t,d)=>new Promise((e,i)=>{var u=r=>{try{o(d.next(r))}catch(a){i(a)}},p=r=>{try{o(d.throw(r))}catch(a){i(a)}},o=r=>r.done?e(r.value):Promise.resolve(r.value).then(u,p);o((d=d.apply(c,t)).next())});import{setLocalStorage as l,getLocalStorage as n,loadHeaderFooter as h,alertMessage as m,updateCartIcon as $,calculateDiscount as C}from"./utils.js";h();export default class g{constructor(t,d){this.productId=t,this.product={},this.dataSource=d}init(){return s(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),document.querySelector("main").innerHTML=this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){let t=n("so-cart");t||(t=[]),t.push(this.product),l("so-cart",t),m(`${this.product.NameWithoutBrand} added to cart!`),$()}renderProductDetails(){const t=C(this.product);let d="";return t>0&&(d=t),`<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card_price">$${this.product.FinalPrice}</p>
    <p class="discount-rate">-${d}%</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`}}
