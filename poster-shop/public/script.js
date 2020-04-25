let LOAD_NUM = 4;
let watcher;

new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [],
		cart: [],
		search: "cat",
		lastSearch: "",
		loading: false,
		results: [],
	},
	methods: {
		addToCart: function (product) {
			this.total += product.price;
			let found = false;
			for (let i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === product.id) {
					this.cart[i].qty++;
					found = true;
				}
			}
			if (!found) {
				this.cart.push({
					id: product.id,
					title: product.title,
					price: product.price,
					qty: 1,
				});
			}
		},
		inc: function (item) {
			item.qty++;
			this.total += item.price;
		},
		dec: function (item) {
			item.qty--;
			this.total -= item.price;
			if (item.qty <= 0) {
				let i = this.cart.indexOf(item);
				this.cart.splice(i, 1);
			}
		},
		onSubmit: function () {
			this.products = [];
			this.results = [];
			this.loading = true;
			let path = "/search?q=".concat(this.search);
			this.$http.get(path).then(function (response) {
				this.results = response.body;
				this.products = response.body.slice(0, LOAD_NUM);
				this.lastSearch = this.search;
				this.appendReuslts();
				this.loading = false;
			});
		},
		appendReuslts: function () {
			console.log(this.products);
			if (this.products.length < this.results.length) {
				let toAppend = this.results.slice(
					this.products.length,
					LOAD_NUM + this.products.length
				);
				this.products = this.products.concat(toAppend);
			}
		},
	},
	filters: {
		currency: function (price) {
			return "$".concat(price.toFixed(2));
		},
	},
	created: function () {
		this.onSubmit();
	},
	updated: function () {
		const sensor = document.querySelector("#product-list-bottom");
		watcher = scrollMonitor.create(sensor);

		watcher.enterViewport(this.appendReuslts);
	},
	beforeUpdate: function () {
		if (watcher) {
			watcher.destroy();
			watcher = null;
		}
	},
});
