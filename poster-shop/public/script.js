new Vue({
	el: "#app",
	data: {
		total: 0,
		products: [
			{ id: 1, title: "product1" },
			{ id: 2, title: "product2" },
			{ id: 3, title: "product3" },
		],
		cart: [],
	},
	methods: {
		addToCart: function (product) {
			console.log(product.id);
		},
	},
});
