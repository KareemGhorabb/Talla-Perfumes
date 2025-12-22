// Product Detail Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const products = window.TALLA?.products || [];
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  const product = products.find(p => p.id === productId);
  const container = document.getElementById('productDetail');
  
  if (!product || !container) {
    if (container) container.innerHTML = '<p>Product not found</p>';
    return;
  }

  // Update page title
  document.title = `${product.name} | TALLA`;

  container.innerHTML = `
    <div class="product-gallery">
      <div class="product-main-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
    </div>
    <div class="product-details">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <p class="product-brand">${product.brand}</p>
      <h1>${product.name}</h1>
      <p class="product-description">${product.description}</p>
      
      <div class="product-notes-section">
        <h3>Fragrance Notes</h3>
        <div class="notes-grid">
          <div class="note-group">
            <h4>Top Notes</h4>
            <p>${product.top?.join(', ') || 'N/A'}</p>
          </div>
          <div class="note-group">
            <h4>Heart Notes</h4>
            <p>${product.middle?.join(', ') || 'N/A'}</p>
          </div>
          <div class="note-group">
            <h4>Base Notes</h4>
            <p>${product.base?.join(', ') || 'N/A'}</p>
          </div>
        </div>
      </div>
      
      <div class="product-price-section">
        <span class="price-display">$${product.price}</span>
      </div>
      
      <div class="product-actions">
        <button class="btn btn-primary" onclick="addToCart('${product.id}')">
          <i class="fa-solid fa-bag-shopping"></i> Add to Bag
        </button>
      </div>
    </div>
  `;
});
