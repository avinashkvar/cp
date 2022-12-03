import { navbar } from './navbar.js';
let cartItem = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cartItem);
let page = 1;
let arr = [];
document.getElementById('navbar').innerHTML = navbar();
document.getElementById('page_number').textContent = page;
document.getElementById('cart_count').textContent = cartItem.length;
const getData = (page) => {
	if (page == 1) {
		document.getElementById('previous').setAttribute('disabled', false);
	} else if (page == 7) {
		document.getElementById('next').setAttribute('disabled', true);
	} else {
		document.getElementById('next').removeAttribute('disabled');
		document.getElementById('previous').removeAttribute('disabled');
	}
	fetch(
		`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=6&page=${page}`,
	)
		.then((res) => res.json())
		.then(({ data }) => {
			display(data);
			arr = data;
		});
};

getData(1);

const display = (data) => {
	document.getElementById('main_items').innerHTML = null;
	data.map((e) => {
		let div = document.createElement('div');
		div.setAttribute('class', 'item');

		let image = document.createElement('img');
		image.src = e.image;
		let h1 = document.createElement('h1');
		h1.textContent = e.brand;

		let price = document.createElement('h4');
		price.textContent = e.price;
		price.setAttribute('class', 'price');
		let button = document.createElement('button');
		button.textContent = 'Add To Cart';
		button.setAttribute('class', 'add_to_cart');
		button.addEventListener('click', () => {
			cartItem.push(e);
			console.log(cartItem);
			localStorage.setItem('cart', JSON.stringify(cartItem));
			document.getElementById('cart_count').textContent = cartItem.length;
		});

		div.append(image, h1, price, button);

		document.getElementById('main_items').append(div);
	});
};

document.getElementById('previous').addEventListener('click', () => {
	page -= 1;
	console.log(page, arr);
	document.getElementById('page_number').textContent = page;
	getData(page);
});

document.getElementById('next').addEventListener('click', () => {
	page += 1;
	console.log(page, arr);
	document.getElementById('page_number').textContent = page;
	getData(page);
});

document.getElementById('sort-lth').addEventListener('click', () => {
	arr.sort((a, b) => a.price - b.price);
	display(arr);
});

document.getElementById('sort-htl').addEventListener('click', () => {
	arr.sort((a, b) => b.price - a.price);
	display(arr);
});
