let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    if (window.cartInitialized) return;

    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close');
    const checkoutButton = document.getElementById('checkout-button');

    cartButton.addEventListener('click', () => cartModal.style.display = "block");
    closeButton.addEventListener('click', () => cartModal.style.display = "none");
    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = "none";
        }
    });

    checkoutButton.addEventListener('click', checkout);

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            addToCart(product.dataset.name, parseFloat(product.dataset.price));
        });
    });

    updateCartDisplay();
    window.cartInitialized = true;
}

function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `<p>${item.name} - $${item.price}</p>`).join('');
    totalAmount.textContent = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

function checkout() {
    alert('Pedido realizado. Total: $' + cart.reduce((total, item) => total + item.price, 0).toFixed(2));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// No llamamos a initCart() aquí. Se llamará desde el HTML.