// Function to add item to cart
function addToCart(productName, price, imageSrc) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        // If product exists, increase quantity
        existingProduct.quantity += 1;
    } else {
        // If product doesn't exist, add a new product object
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
            image: imageSrc
        });
    }

    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
}

// Function to retrieve and display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: 
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', 'decrease')">-</button>
                ${item.quantity}
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', 'increase')">+</button>
            </p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
        </div>
    `).join("");

    // Add a total calculation (optional)
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartContainer.innerHTML += `
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
        <button class="checkout-btn" onclick="checkout()">Checkout</button>
    `;
}

// Function to update item quantity
function updateQuantity(productName, action) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.name === productName);

    if (product) {
        if (action === 'increase') {
            product.quantity += 1;
        } else if (action === 'decrease' && product.quantity > 1) {
            product.quantity -= 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
}

// Function to remove item from cart
function removeItem(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== productName);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Function for checkout (you can customize this function further)
function checkout() {
    alert("Proceeding to checkout...");
    // Redirect to checkout page or handle checkout logic here
}
