// TALLA - Main Application JavaScript

const products = [
  {
    id: '1',
    name: 'Layaly',
    brand: 'TALLA',
    price: 189,
    category: 'oriental',
    badge: 'LUXURY',
    image: 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2NTE5MjM0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A mysterious night fragrance with deep oud and amber',
    story: 'Inspired by Arabian nights, Layaly captures the essence of midnight romance and timeless elegance.',
    mood: 'Mysterious, Seductive, Confident',
    scentFamily: 'oriental',
    notes: 'Oud, Rose, Amber',
    top: ['Bergamot', 'Saffron', 'Black Pepper'],
    middle: ['Oud', 'Rose', 'Jasmine'],
    base: ['Amber', 'Musk', 'Sandalwood'],
    rating: 4.8,
    reviews: 342,
    similarTo: 'Dior Sauvage'
  },
  {
    id: '2',
    name: 'Lumière Dorée',
    brand: 'TALLA',
    price: 165,
    category: 'citrus',
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1747052881000-a640a4981dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjUxODM1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Golden hour captured in a bottle with warm vanilla and citrus',
    story: 'The golden light of sunset transformed into a warm, radiant fragrance.',
    mood: 'Warm, Optimistic, Radiant',
    scentFamily: 'citrus',
    notes: 'Orange Blossom, Vanilla, Musk',
    top: ['Orange Blossom', 'Mandarin', 'Neroli'],
    middle: ['Vanilla', 'Tonka Bean', 'Honey'],
    base: ['Benzoin', 'White Musk', 'Cedar'],
    rating: 4.9,
    reviews: 218,
    similarTo: 'Viktor & Rolf Flowerbomb'
  },
  {
    id: '3',
    name: 'Midnight Garden',
    brand: 'TALLA',
    price: 175,
    category: 'floral',
    badge: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1758225502621-9102d2856dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFncmFuY2UlMjBib3R0bGUlMjBnb2xkfGVufDF8fHx8MTc2NTE2MTI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A nocturnal floral journey with jasmine and gardenia',
    story: 'Walk through a secret garden under moonlight where flowers bloom only at night.',
    mood: 'Romantic, Elegant, Dreamy',
    scentFamily: 'floral',
    notes: 'Jasmine, Gardenia, Vetiver',
    top: ['Green Leaves', 'Peony', 'Lemon'],
    middle: ['Jasmine', 'Gardenia', 'Tuberose'],
    base: ['Vetiver', 'Patchouli', 'Cedarwood'],
    rating: 4.7,
    reviews: 456,
    similarTo: 'Tom Ford Black Orchid'
  },
  {
    id: '4',
    name: 'Solar Bliss',
    brand: 'TALLA',
    price: 145,
    category: 'fresh',
    badge: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1709095458514-573bc6277d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZGlzcGxheSUyMGx1eHVyeXxlbnwxfHx8fDE3NjUyMjY2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh citrus and sea salt for endless summer vibes',
    story: 'Bottled sunshine - the feeling of warm sand and ocean breeze.',
    mood: 'Fresh, Energetic, Carefree',
    scentFamily: 'fresh',
    notes: 'Grapefruit, Coconut, Driftwood',
    top: ['Grapefruit', 'Sea Salt', 'Mint'],
    middle: ['Coconut', 'Ylang Ylang', 'Lavender'],
    base: ['Driftwood', 'Ambergris', 'Musk'],
    rating: 4.6,
    reviews: 289,
    similarTo: 'Dolce & Gabbana Light Blue'
  },
  {
    id: '5',
    name: 'Velvet Noir',
    brand: 'TALLA',
    price: 199,
    category: 'woody',
    badge: 'LUXURY',
    image: 'https://images.unsplash.com/photo-1705899853374-d91c048b81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwxfHx8fDE3NjUxOTAzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Dark and luxurious with leather and tobacco',
    story: 'The scent of a velvet-lined library filled with antique books and cognac.',
    mood: 'Sophisticated, Bold, Powerful',
    scentFamily: 'woody',
    notes: 'Leather, Tobacco, Oud',
    top: ['Black Pepper', 'Cardamom', 'Pink Pepper'],
    middle: ['Leather', 'Tobacco', 'Iris'],
    base: ['Oud', 'Patchouli', 'Vanilla'],
    rating: 4.9,
    reviews: 167,
    similarTo: 'Creed Aventus'
  },
  {
    id: '6',
    name: 'Desert Rose',
    brand: 'TALLA',
    price: 155,
    category: 'spicy',
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1759848547378-d59542dcb935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJlciUyMHBlcmZ1bWUlMjBib3R0bGV8ZW58MXx8fHwxNzY1MjI2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Warm spices meet delicate rose petals',
    story: 'A rare flower blooming in the desert at dawn, combining strength and beauty.',
    mood: 'Exotic, Sensual, Adventurous',
    scentFamily: 'spicy',
    notes: 'Rose, Cinnamon, Amber',
    top: ['Pink Pepper', 'Cinnamon', 'Nutmeg'],
    middle: ['Damascus Rose', 'Geranium', 'Clove'],
    base: ['Amber', 'Frankincense', 'Myrrh'],
    rating: 4.8,
    reviews: 203,
    similarTo: 'Yves Saint Laurent Black Opium'
  }
];
window.products = products;

// ===== State Management =====
let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('talla_wishlist')) || [];

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initCart();
  initSearch();
  loadProducts();
  updateCartUI();
});

// ===== Navbar =====
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
  
  // Mobile menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.toggle('active');
    });
  }
}

// ===== Particles Effect =====
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

// ===== Load Products =====
function loadProducts() {
  const newDropsGrid = document.getElementById('newDropsGrid');
  const luxuryGrid = document.getElementById('luxuryGrid');
  const trendingGrid = document.getElementById('trendingGrid');
  
  const newDrops = products.filter(p => p.badge === 'NEW');
  const luxury = products.filter(p => p.badge === 'LUXURY');
  const trending = products.filter(p => p.badge === 'TRENDING');
  
  if (newDropsGrid) renderProducts(newDropsGrid, newDrops.length ? newDrops : products.slice(0, 3));
  if (luxuryGrid) renderProducts(luxuryGrid, luxury.length ? luxury : products.slice(0, 3));
  if (trendingGrid) renderProducts(trendingGrid, trending.length ? trending : products.slice(2, 5));
}

function renderProducts(container, items) {
  container.innerHTML = items.map(product => `
    <div class="product-card" data-id="${product.id}" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn wishlist-btn" onclick="event.stopPropagation(); toggleWishlist('${product.id}')" title="Add to Wishlist">
            <i class="${wishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <button class="action-btn" onclick="event.stopPropagation(); quickView('${product.id}')" title="Quick View"><i class="fa-solid fa-eye"></i></button>
        </div>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-notes">${product.notes}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price}</span>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')" title="Add to Cart"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== Cart Functions =====
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
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('miniCart')?.classList.remove('active');
  document.getElementById('cartOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

function addToCart(productId) {
  // Always read from localStorage to stay in sync
  cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(item => item.id === productId && item.type !== 'custom');
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  saveCart();
  updateCartUI();
  openCart();
  
  // Animation feedback
  if (event && event.target) {
    const btn = event.target;
    btn.style.transform = 'scale(1.3) rotate(360deg)';
    setTimeout(() => btn.style.transform = '', 300);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

function saveCart() {
  localStorage.setItem('talla_cart', JSON.stringify(cart));
}

function updateCartUI() {
  // Always read from localStorage to stay in sync with other pages
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
          <p style="font-size: 3rem; margin-bottom: 1rem;"><i class="fa-solid fa-bag-shopping"></i></p>
          <p>Your bag is empty</p>
          <a href="products.html" class="btn btn-secondary" style="margin-top: 1rem;">Shop Now</a>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-img">
            ${item.image && item.image.startsWith('http') 
              ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` 
              : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); border-radius: 8px;"><i class="fa-solid fa-flask" style="font-size: 1.5rem;"></i></div>`}
          </div>
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">$${item.price || 0}${item.type === 'custom' ? ' • Custom' : ''}</p>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateQtyByIndex(${index}, -1)">-</button>
              <span>${item.qty || 1}</span>
              <button class="qty-btn" onclick="updateQtyByIndex(${index}, 1)">+</button>
              <button onclick="removeFromCartByIndex(${index})" style="margin-left: auto; color: var(--color-rose-gold); background: none; border: none; cursor: pointer;"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

// Update quantity by index (for unified cart)
function updateQtyByIndex(index, delta) {
  cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  if (cart[index]) {
    cart[index].qty = (cart[index].qty || 1) + delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('talla_cart', JSON.stringify(cart));
    updateCartUI();
  }
}

// Remove from cart by index
function removeFromCartByIndex(index) {
  cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('talla_cart', JSON.stringify(cart));
  updateCartUI();
}

// ===== Wishlist =====
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  localStorage.setItem('talla_wishlist', JSON.stringify(wishlist));
  loadProducts(); // Refresh to update heart icons
}

// ===== Search =====
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchClose = document.getElementById('searchClose');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchTags = document.querySelectorAll('.search-tag');
  
  if (searchBtn) searchBtn.addEventListener('click', () => {
    searchModal?.classList.add('active');
    searchInput?.focus();
    document.body.style.overflow = 'hidden';
  });
  
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => performSearch(e.target.value));
  }
  
  searchTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const query = tag.dataset.query;
      if (searchInput) searchInput.value = query;
      performSearch(query);
    });
  });
  
  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeCart();
    }
  });
}

function closeSearch() {
  document.getElementById('searchModal')?.classList.remove('active');
  document.body.style.overflow = '';
}

function performSearch(query) {
  const results = document.getElementById('searchResults');
  if (!results || !query.trim()) {
    if (results) results.innerHTML = '';
    return;
  }
  
  const q = query.toLowerCase();
  const matched = products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.notes.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.mood.toLowerCase().includes(q) ||
    (p.similarTo && p.similarTo.toLowerCase().includes(q))
  );
  
  if (matched.length === 0) {
    results.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--color-lavender);">
        <p>No results found for "${query}"</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Try searching for notes like "rose", "oud", or moods like "fresh"</p>
      </div>
    `;
  } else {
    results.innerHTML = matched.map(p => `
      <a href="product.html?id=${p.id}" class="search-result-item" style="text-decoration: none;">
        <img src="${p.image}" alt="${p.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
        <div>
          <p style="font-weight: 500; color: white;">${p.name}</p>
          <p style="font-size: 0.85rem; color: var(--color-lavender);">${p.notes}</p>
          <p style="color: var(--color-champagne); font-family: var(--font-display);">$${p.price}</p>
        </div>
      </a>
    `).join('');
  }
}

// ===== Quick View =====
function quickView(productId) {
  window.location.href = `product.html?id=${productId}`;
}

// ===== Newsletter =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input && input.value) {
      alert('Welcome to the TALLA family! Check your email for your 15% discount code.');
      input.value = '';
    }
  });
}

// ===== Export for other pages =====
window.TALLA = {
  products,
  cart,
  wishlist,
  addToCart,
  removeFromCart,
  updateQty,
  toggleWishlist,
  updateCartUI,
  saveCart
};
