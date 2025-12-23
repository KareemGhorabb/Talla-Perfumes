// Products Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const products = window.TALLA?.products || [];
  const grid = document.getElementById('productsGrid');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');

  // Check URL for category filter
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get('category');
  if (urlCategory && categoryFilter) {
    categoryFilter.value = urlCategory;
  }

  function renderProducts() {
    let filtered = [...products];
    
    // Apply category filter
    const category = categoryFilter?.value;
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    // Apply sort
    const sort = sortFilter?.value;
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (grid) {
      grid.innerHTML = filtered.map(product => `
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
  }

  categoryFilter?.addEventListener('change', renderProducts);
  sortFilter?.addEventListener('change', renderProducts);
  
  renderProducts();
});
