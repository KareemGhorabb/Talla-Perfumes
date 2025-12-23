// miniTALLA - Simplified Main Application JavaScript
// Product data
const products = [
  {
    id: '1', name: 'Layaly', brand: 'TALLA', price: 189, category: 'oriental', badge: 'LUXURY',
    image: "images/Screenshot 2025-12-19 163230.png",
    description: 'A mysterious night fragrance with deep oud and amber',
    notes: 'Oud, Rose, Amber',
    top: ['Bergamot', 'Saffron'], middle: ['Oud', 'Rose'], base: ['Amber', 'Musk']
  },
  {
    id: '2', name: 'Lumière Dorée', brand: 'TALLA', price: 165, category: 'citrus', badge: 'NEW',
    image: "images/Screenshot 2025-12-19 163238.png",
    description: 'Golden hour captured in a bottle with warm vanilla and citrus',
    notes: 'Orange Blossom, Vanilla, Musk',
    top: ['Orange Blossom', 'Mandarin'], middle: ['Vanilla', 'Tonka Bean'], base: ['Benzoin', 'White Musk']
  },
  {
    id: '3', name: 'Midnight Garden', brand: 'TALLA', price: 175, category: 'floral', badge: 'TRENDING',
    image: "images/Screenshot 2025-12-19 163246.png",
    description: 'A nocturnal floral journey with jasmine and gardenia',
    notes: 'Jasmine, Gardenia, Vetiver',
    top: ['Green Leaves', 'Peony'], middle: ['Jasmine', 'Gardenia'], base: ['Vetiver', 'Patchouli']
  },
  {
    id: '4', name: 'Solar Bliss', brand: 'TALLA', price: 145, category: 'fresh', badge: 'TRENDING',
    image: "images/Screenshot 2025-12-19 163255.png",
    description: 'Fresh citrus and sea salt for endless summer vibes',
    notes: 'Grapefruit, Coconut, Driftwood',
    top: ['Grapefruit', 'Sea Salt'], middle: ['Coconut', 'Ylang Ylang'], base: ['Driftwood', 'Musk']
  },
  {
    id: '5', name: 'Velvet Noir', brand: 'TALLA', price: 199, category: 'woody', badge: 'LUXURY',
    image: "images/Screenshot 2025-12-19 163302.png",
    description: 'Dark and luxurious with leather and tobacco',
    notes: 'Leather, Tobacco, Oud',
    top: ['Black Pepper', 'Cardamom'], middle: ['Leather', 'Tobacco'], base: ['Oud', 'Vanilla']
  },
  {
    id: '6', name: 'Desert Rose', brand: 'TALLA', price: 155, category: 'spicy', badge: 'NEW',
    image: "images/Screenshot 2025-12-19 163338.png",
    description: 'Warm spices meet delicate rose petals',
    notes: 'Rose, Cinnamon, Amber',
    top: ['Pink Pepper', 'Cinnamon'], middle: ['Damascus Rose', 'Geranium'], base: ['Amber', 'Frankincense']
  },
  {
    id: '7', name: 'Velvet E', brand: 'TALLA', price: 199, category: 'woody', badge: 'LUXURY',
    image: "images/Screenshot 2025-12-19 163322.png",
    description: 'Dark and luxurious with leather and tobacco',
    notes: 'Leather, Tobacco, Oud',
    top: ['Black Pepper', 'Cardamom'], middle: ['Leather', 'Tobacco'], base: ['Oud', 'Vanilla']
  },
  {
    id: '8', name: 'Desert Cose', brand: 'TALLA', price: 155, category: 'spicy', badge: 'NEW',
    image: "images/Screenshot 2025-12-19 163329.png",
    description: 'Warm spices meet delicate rose petals',
    notes: 'Rose, Cinnamon, Amber',
    top: ['Pink Pepper', 'Cinnamon'], middle: ['Damascus Rose', 'Geranium'], base: ['Amber', 'Frankincense']
  }
];

// Make products globally available
window.TALLA = { products };

// Toast notification function
function showToast(message, type = 'success', duration = 3000) {
  // Create container if it doesn't exist
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Make toast globally available
window.showToast = showToast;

// Cart from localStorage
let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initParticles();
  initNavbar();
  initAccountIcon();
  loadProducts();
  updateCartUI();
});

// Update account icon based on login status
function initAccountIcon() {
  const user = JSON.parse(localStorage.getItem('talla_user'));
  const accountLinks = document.querySelectorAll('.nav-icon[title="Account"], a.nav-icon[href="login.html"]');
  
  accountLinks.forEach(link => {
    if (user && user.email) {
      // User is logged in - link to account page
      link.href = 'account.html';
      link.title = 'My Account';
      link.innerHTML = '<i class="fa-solid fa-user"></i>';
    } else {
      // Not logged in - link to login page
      link.href = 'login.html';
      link.title = 'Sign In';
      link.innerHTML = '<i class="fa-regular fa-user"></i>';
    }
  });
}

// Navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Particles initialization
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (8 + Math.random() * 6) + 's';
    container.appendChild(particle);
  }
}

// Cart initialization
function initCart() {
  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');
  
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

function openCart() {
  document.getElementById('miniCart')?.classList.add('active');
  document.getElementById('cartOverlay')?.classList.add('active');
}

function closeCart() {
  document.getElementById('miniCart')?.classList.remove('active');
  document.getElementById('cartOverlay')?.classList.remove('active');
}

// Load products into grids
function loadProducts() {
  const newDropsGrid = document.getElementById('newDropsGrid');
  const luxuryGrid = document.getElementById('luxuryGrid');
  
  if (newDropsGrid) {
    const newProducts = products.filter(p => p.badge === 'NEW' || p.badge === 'TRENDING');
    renderProducts(newDropsGrid, newProducts);
  }
  if (luxuryGrid) {
    const luxury = products.filter(p => p.badge === 'LUXURY');
    renderProducts(luxuryGrid, luxury);
  }
}

function renderProducts(container, items) {
  container.innerHTML = items.map(product => `
    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-notes">${product.notes}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price}</span>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Cart functions
function addToCart(productId) {
  cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(item => item.id === productId && !item.type);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  saveCart();
  updateCartUI();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateQty(index, delta) {
  cart[index].qty = (cart[index].qty || 1) + delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('talla_cart', JSON.stringify(cart));
}

function updateCartUI() {
  cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const totalPrice = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
  
  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--color-lavender);">
          <p style="font-size: 3rem; margin-bottom: 1rem;">🛍️</p>
          <p>Your bag is empty</p>
          <a href="products.html" class="btn btn-secondary" style="margin-top: 1rem;">Shop Now</a>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-img">
            ${item.image?.startsWith('http') 
              ? `<img src="${item.image}" alt="${item.name}">` 
              : '🧴'}
          </div>
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">$${item.price}${item.type === 'custom' ? ' • Custom' : ''}</p>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
              <span>${item.qty || 1}</span>
              <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
              <button onclick="removeFromCart(${index})" style="margin-left: auto; color: var(--color-rose-gold); background: none; border: none; cursor: pointer;">🗑️</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.updateCartUI = updateCartUI;
