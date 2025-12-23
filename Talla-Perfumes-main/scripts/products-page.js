// Products Page JavaScript
// Filter state
let activeFilters = { categories: [], notes: [], minPrice: 0, maxPrice: 500 };
let sortBy = 'featured';

// Get all products from app.js
const allProducts = window.TALLA?.products || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(allProducts);
  initFilters();
  initViewToggle();
  initMobileFilter();
  updateCartCount();
  
  // Check URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) {
    activeFilters.categories = [params.get('category')];
    document.querySelector(`[data-filter="${params.get('category')}"]`)?.classList.add('active');
    applyFilters();
  }
});

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const wishlist = JSON.parse(localStorage.getItem('talla_wishlist')) || [];
  
  grid.innerHTML = products.map(p => `
    <div class="product-card" data-id="${p.id}" onclick="window.location.href='product.html?id=${p.id}'" style="cursor: pointer;">
      <div class="product-image">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn" onclick="event.stopPropagation(); toggleWishlistShop('${p.id}')">
            <i class="${wishlist.includes(p.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <p class="product-brand">${p.brand}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-notes">${p.notes}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCartShop('${p.id}')"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>
  `).join('');

  document.getElementById('resultsCount').textContent = products.length;
}

function initFilters() {
  // Category filters
  document.querySelectorAll('#categoryFilters .filter-option').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('active');
    });
  });

  // Note filters
  document.querySelectorAll('#noteFilters .filter-option').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('active');
    });
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    sortBy = e.target.value;
    applyFilters();
  });
}

function applyFilters() {
  // Get active categories
  activeFilters.categories = [...document.querySelectorAll('#categoryFilters .filter-option.active')]
    .map(el => el.dataset.filter);
  
  // Get active notes
  activeFilters.notes = [...document.querySelectorAll('#noteFilters .filter-option.active')]
    .map(el => el.dataset.note);
  
  // Get price range
  activeFilters.minPrice = parseInt(document.getElementById('minPrice').value) || 0;
  activeFilters.maxPrice = parseInt(document.getElementById('maxPrice').value) || 500;

  // Filter products
  let filtered = allProducts.filter(p => {
    // Category filter
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(p.category) && !activeFilters.categories.includes(p.scentFamily)) {
      return false;
    }
    // Note filter
    if (activeFilters.notes.length > 0 && !activeFilters.notes.some(n => p.notes.includes(n))) {
      return false;
    }
    // Price filter
    if (p.price < activeFilters.minPrice || p.price > activeFilters.maxPrice) {
      return false;
    }
    return true;
  });

  // Sort
  switch(sortBy) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'newest': filtered.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0)); break;
    case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  renderProducts(filtered);
  
  // Close mobile filter
  document.getElementById('filtersSidebar').classList.remove('active');
}

function clearFilters() {
  document.querySelectorAll('.filter-option.active').forEach(el => el.classList.remove('active'));
  document.getElementById('minPrice').value = 0;
  document.getElementById('maxPrice').value = 500;
  activeFilters = { categories: [], notes: [], minPrice: 0, maxPrice: 500 };
  renderProducts(allProducts);
}

function initViewToggle() {
  const grid = document.getElementById('productsGrid');
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');

  gridBtn.addEventListener('click', () => {
    grid.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  listBtn.addEventListener('click', () => {
    grid.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });
}

function initMobileFilter() {
  const btn = document.getElementById('mobileFilterBtn');
  const sidebar = document.getElementById('filtersSidebar');
  const close = document.getElementById('filterClose');

  btn?.addEventListener('click', () => sidebar.classList.add('active'));
  close?.addEventListener('click', () => sidebar.classList.remove('active'));
}

function addToCartShop(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  
  let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('talla_cart', JSON.stringify(cart));
  updateCartCount();
  
  // Feedback
  if (event && event.target) {
    event.target.style.transform = 'scale(1.3) rotate(360deg)';
    setTimeout(() => event.target.style.transform = '', 300);
  }
}

function toggleWishlistShop(productId) {
  let wishlist = JSON.parse(localStorage.getItem('talla_wishlist')) || [];
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  localStorage.setItem('talla_wishlist', JSON.stringify(wishlist));
  applyFilters(); // Re-render
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = count;
}
