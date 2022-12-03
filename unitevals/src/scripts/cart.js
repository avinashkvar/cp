
import { navbar } from './navbar.js';

document.getElementById('navbar').innerHTML = navbar();

let cartItem = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('cart_count').textContent = cartItem.length;
const display = (data) => {
	document.getElementById('items').innerHTML = null;
	data.map((e,i) => {
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
		button.textContent = 'remove';
		button.setAttribute('class', 'remove');
		button.addEventListener('click', () => {
		     deletItem(i)
		});

		div.append(image, h1, price, button);

		document.getElementById('items').append(div);
	});
};

display(cartItem);


const deletItem = (i)=>{
    cartItem.splice(i,1);
    console.log(cartItem);
    document.getElementById('cart_count').textContent = cartItem.length;
	localStorage.setItem('cart', JSON.stringify(cartItem));
    display(cartItem)
}