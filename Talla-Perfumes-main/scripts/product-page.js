// Product Detail Page JavaScript
// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id') || '1';

// Debugging
console.log('Product ID from URL:', productId);
console.log('Global products variable type:', typeof products);
if (typeof products !== 'undefined') {
  console.log('Products array length:', products.length);
  console.log('First product ID:', products[0]?.id);
  console.log('Looking for product with ID:', productId);
} else {
  console.error('Products variable is undefined!');
}

// Find product
const product = (typeof products !== 'undefined' ? products : []).find(p => p.id === productId) || (typeof products !== 'undefined' ? products[0] : null);

console.log('Found product:', product);

if (!product) {
   // Handle case where products are not loaded
   console.error('Product not found for ID:', productId);
   document.querySelector('.product-layout').innerHTML = `<div style="text-align:center; padding: 4rem;"><h2>Product not found (ID: ${productId})</h2><p>Please check console for details.</p><a href="products.html" class="btn btn-primary">Back to Shop</a></div>`;
   throw new Error('Product not found');
}
let selectedSize = 50;
let selectedPrice = product.price;

// Populate page
document.title = `${product.name} | TALLA`;
document.getElementById('productImage').src = product.image;
document.getElementById('productImage').alt = product.name;
document.getElementById('productBadge').textContent = product.badge || '';
document.getElementById('productBadge').style.display = product.badge ? 'block' : 'none';
document.getElementById('productBrand').textContent = product.brand;
document.getElementById('productName').textContent = product.name;
document.getElementById('productTagline').textContent = `"${product.description}"`;
document.getElementById('productPrice').textContent = product.price;

// Rating
const fullStars = Math.floor(product.rating || 5);
const starString = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
document.getElementById('productStars').textContent = starString;
document.getElementById('productReviews').textContent = `(${product.reviews || 0} reviews)`;

// Similar To
if (product.similarTo) {
  document.getElementById('similarTo').style.display = 'block';
  document.getElementById('similarToName').textContent = product.similarTo;
}

// Story
document.getElementById('productStory').textContent = product.story || product.description;

// Fragrance pyramid
document.getElementById('topNotes').innerHTML = (product.top || ['Bergamot', 'Citrus']).map(n => `<span class="note-tag">${n}</span>`).join('');
document.getElementById('middleNotes').innerHTML = (product.middle || ['Rose', 'Jasmine']).map(n => `<span class="note-tag">${n}</span>`).join('');
document.getElementById('baseNotes').innerHTML = (product.base || ['Musk', 'Vanilla']).map(n => `<span class="note-tag">${n}</span>`).join('');

// Size prices
document.getElementById('price30').textContent = `$${Math.round(product.price * 0.7)}`;
document.getElementById('price50').textContent = `$${product.price}`;
document.getElementById('price100').textContent = `$${Math.round(product.price * 1.6)}`;

// Size selection
document.querySelectorAll('.size-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    selectedSize = parseInt(opt.dataset.size);
    selectedPrice = Math.round(product.price * parseFloat(opt.dataset.multiplier));
    document.getElementById('productPrice').textContent = selectedPrice;
  });
});

// Add to cart
document.getElementById('addToCartBtn').addEventListener('click', () => {
  let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  const item = { ...product, size: selectedSize, price: selectedPrice, qty: 1 };
  const existing = cart.find(c => c.id === product.id && c.size === selectedSize);
  if (existing) {
    existing.qty++;
  } else {
    cart.push(item);
  }
  localStorage.setItem('talla_cart', JSON.stringify(cart));
  
  // Update global cart UI (mini-cart)
  if (typeof updateCartUI === 'function') {
    updateCartUI();
  }
  
  // Open mini-cart
  const miniCart = document.getElementById('miniCart');
  const cartOverlay = document.getElementById('cartOverlay');
  if (miniCart && cartOverlay) {
    miniCart.classList.add('active');
    cartOverlay.classList.add('active');
  }
});

// Wishlist
const wishlistBtn = document.getElementById('wishlistBtn');
// Use global wishlist from app.js
wishlistBtn.textContent = wishlist.includes(productId) ? '❤️' : '🤍';

wishlistBtn.addEventListener('click', () => {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    wishlistBtn.textContent = '🤍';
  } else {
    wishlist.push(productId);
    wishlistBtn.textContent = '❤️';
  }
  localStorage.setItem('talla_wishlist', JSON.stringify(wishlist));
});

// Similar products
const similar = (typeof products !== 'undefined' ? products : []).filter(p => p.id !== productId && (p.category === product.category || p.scentFamily === product.scentFamily)).slice(0, 3);
const fallback = (typeof products !== 'undefined' ? products : []).filter(p => p.id !== productId).slice(0, 3);
const toShow = similar.length >= 2 ? similar : fallback;

document.getElementById('similarProducts').innerHTML = toShow.map(p => `
  <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'" style="cursor: pointer;">
    <div class="product-image">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-actions">
         <button class="action-btn" onclick="event.stopPropagation(); addToCart('${p.id}')" title="Add to Cart">
           <i class="fa-solid fa-bag-shopping"></i>
         </button>
      </div>
    </div>
    <div class="product-info">
      <p class="product-brand">${p.brand}</p>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-notes">${p.notes}</p>
      <div class="product-footer">
        <span class="product-price">$${p.price}</span>
      </div>
    </div>
  </div>
`).join('');

// Initial UI update
if (typeof updateCartUI === 'function') {
  updateCartUI();
}
