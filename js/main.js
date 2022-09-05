'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



const app = new Vue({
	el: '#app',
	data: {
		userSearch: '',
		showCart: false,
		catalogUrl: '/catalogData.json',
		cartUrl: '/getBasket.json',
		cartItems: [],
		filtered: [],
		imgCart: 'https://i.ibb.co/Sd4Z07m/monitor.jpg/50x100',
		products: [],
		imgCatalog: 'https://i.ibb.co/Sd4Z07m/monitor.jpg/200x150'
	},
	methods: {
		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error);
				})
		},
		addProduct(item) {
			this.getJson(`${API}/addToBasket.json`)
				.then(data => {
					if (data.result == 1) {
						let find = this.cartItems.find(el => el.id_product == item.id_product);
						if (find) {
							find.quantity++;
						} else {
							const prod = Object.assign({ quantity: 1 }, item); // создание нового объекта на основе двух, указанных в параметрах
							this.cartItems.push(prod)
						}
					}
				})
		},
		remove(item) {
			this.getJson(`${API}/deleteFromBasket.json`)
				.then(data => {
					if (data.result == 1) {
						if (item.quantity > 1) {
							item.quantity--;
						} else {
							this.cartItems.splice(this.cartItems.indexOf(item), 1);
						}
					}
				})
		},
		filter() {
			const regexp = new RegExp(this.userSearch, 'i');
			this.filtered = this.products.filter(product => regexp.test(product.product_name));
		}
	},
	mounted() {
		this.getJson(`${API + this.cartUrl}`)
			.then(data => {
				for (let item of data.contents) {
					this.cartItems.push(item);
				}
			});
		this.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				for (let item of data) {
					this.products.push(item);
					this.filtered.push(item);
				}
			});
		this.getJson(`getProducts.json`)
			.then(data => {
				for (let item of data) {
					this.products.push(item);
					this.filtered.push(item);
				}
			})
	}
});





// class ProductList {
// 	constructor(container = '.products') {
// 		this.container = container;
// 		this.goods = []; // массив товаров из JSON документа
// 		//this.totalPrice() = []; // массив объектов
// 		this._getProducts()  // _ рекомендация, чтобы метод был вызван в текущем классе
// 			.then(data => { // data - объект js
// 				this.goods = [...data];
// 				console.log(data);
// 				this.render();
// 			});

// 	}

// 	_getProducts() {
// 		return fetch(`${API}/catalogData.json`)
// 			.then(result => result.json())
// 			.catch(error => {
// 				console.log(error);
// 			})
// 	}


// 	/**
//  * метод суммирует все цены 
//  * @returns возвращает итоговую сумму
//  */
// calcuTotalPrice() {
// 	// let totalPrice = 0;
// 	// for (let i = 0; i < this.goods.length; i++) {
// 	// 	totalPrice += this.goods[i].price;
// 	// }
// 	// console.log(totalPrice);
// 	// return totalPrice;

// 	//	или так:

// 	return this.goods.reduce((total, item) => total += item.price, 0);
// 	//console.log(totalPrice);
// }


// render() {
// 	const block = document.querySelector(this.container);
// 	for (let product of this.goods) {
// 		const item = new ProductItem(product);
// 		console.log(item);
// 		//this.goods.push(productObj);
// 		block.insertAdjacentHTML("beforeend", item.render());
// 		//              block.innerHTML += item.render();
// 	}
// }



// }


// class ProductItem {
// 	constructor(product, img = 'https://i.ibb.co/Sd4Z07m/monitor.jpg') {
// 		this.title = product.product_name;
// 		this.id = product.id_product;
// 		this.price = product.price;
// 		this.img = img;
// 	}



// 	render() {

// 		return `
		      //   <div class="product-item" data-id="${this.id}">
            //      <h3 class="product-title">${this.title}</h3>
		      //      <img class="product-img" src="${this.img} alt="${this.title}">
            //      <p class="product-price">${this.price.toLocaleString()} $</p>
            //      <button data-productid="${this.id}" class="product__buy-btn">Купить</button>
            //   </div>
// 				`
// 	}
// }

// let list = new ProductList();
// list.render();
// list.calcuTotalPrice();







// class BasketList {
// 	constructor(container = '.basket') {
// 		this.container = container;
// 		this.basket = []; // массив товаров
// 		this._clickBasket();
// 		this._addBasketProduct()
// 			.then(data => { //data - объект js
// 				this.basket = data.contents;
// 				this.render();
// 			});
// 	}


// 	removeProduct() {

// 	}

// 	changeProduct() {

// 	}

// 	_addBasketProduct() {
// 		return fetch(`${API}/getBasket.json`)
// 			.then(result => result.json())
// 			.catch(error => {
// 				console.log(error());
// 			})
// 	}

// 	render() {
// 		const block = document.querySelector(this.container);
// 		for (let product of this.basket) {
// 			const item = new BasketItem(product);
// 			block.insertAdjacentHTML("beforeend", item.render());
// 			//              block.innerHTML += item.render();
// 		}
// 	}

// 	_clickBasket() {
// 		document.querySelector('.btn-cart').addEventListener('click', () => {
// 			document.querySelector(this.container).classList.toggle('hidden');
// 		})
// 	}

// }


// class BasketItem {

// 	constructor(product, img = 'https://i.ibb.co/Sd4Z07m/monitor.jpg') {
// 		this.title = product.product_name;
// 		this.id = product.id_product;
// 		this.price = product.price;
// 		this.img = img;
// 		this.quantity = product.quantity;
// 	}

// 	render() {

// 		return `
// 		<div class="cart-item" data-id="${this.id}">
//             <div class="product-bio">
//             <img src="${this.img}" alt="${this.title}">
//             <div class="product-desc">
//             <p class="product-title_basket">${this.title}</p>
//             <p class="product-quantity">Количество: ${this.quantity}</p>
//         <p class="product-single-price">${this.price.toLocaleString()} $</p>
//         </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price_basket">$${this.quantity * this.price}</p>
//             <button class="del-btn" data-id="${this.title}">&times;</button>
//         </div>
//         </div>
// 				`
// 	}

// }

// let basketList = new BasketList();
// //let products = new ProductList(basketList);



