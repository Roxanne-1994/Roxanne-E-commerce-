let cart = [];

// Same products array as before...
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 89.99,
    image: "https://via.placeholder.com/300"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "https://via.placeholder.com/300"
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: 49.99,
    image: "https://via.placeholder.com/300"
  }
];

// Render product cards
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function renderProducts() {
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-4';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-4">
      <h2 class="text-lg font-semibold">${product.name}</h2>
      <p class="text-gray-600">$${product.price.toFixed(2)}</p>
      <button 
        class="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded add-to-cart"
        data-id="${product.id}"
      >
        Add to Cart
      </button>
    `;

    productList.appendChild(card);
  });

  // Attach event listeners
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === id);
      cart.push(product);
      updateCartCount();
    });
  });
}

renderProducts();
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const cartBtn = document.getElementById('cart-btn');

cartBtn.addEventListener('click', () => {
  renderCartItems();
  cartModal.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  const itemCounts = {};

  cart.forEach(item => {
    if (!itemCounts[item.id]) {
      itemCounts[item.id] = { ...item, quantity: 0 };
    }
    itemCounts[item.id].quantity++;
  });

  Object.values(itemCounts).forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'flex justify-between items-center';

    const subtotal = item.price * item.quantity;
    total += subtotal;

    itemEl.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
      </div>
      <p>$${subtotal.toFixed(2)}</p>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  cartTotal.textContent = total.toFixed(2);
}
