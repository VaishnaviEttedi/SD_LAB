// cart.js

const cart = [];
const totalElement = document.querySelector('.checkout h3');

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
}

function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = ""; // Clear current items
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = "cart-item";
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}
