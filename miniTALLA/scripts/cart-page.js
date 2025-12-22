// Cart Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
});

function renderCartPage() {
  const cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  const container = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');
  
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3>Your bag is empty</h3>
        <p>Looks like you haven't added anything yet</p>
        <a href="products.html" class="btn btn-primary" style="margin-top: 1.5rem;">Start Shopping</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (shippingEl) shippingEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }
  
  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item-card">
      <div class="cart-item-image">
        ${item.image?.startsWith('http') 
          ? `<img src="${item.image}" alt="${item.name}">` 
          : '<i class="fa-solid fa-flask" style="font-size: 2rem; display: flex; align-items: center; justify-content: center; height: 100%;"></i>'}
      </div>
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="notes">${item.notes || (item.type === 'custom' ? 'Custom Blend' : '')}</p>
        <p class="price">$${item.price}</p>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button onclick="updateCartQty(${index}, -1)">-</button>
            <span>${item.qty || 1}</span>
            <button onclick="updateCartQty(${index}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;
  
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function updateCartQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  cart[index].qty = (cart[index].qty || 1) + delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('talla_cart', JSON.stringify(cart));
  renderCartPage();
  updateCartUI();
}

function removeCartItem(index) {
  let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('talla_cart', JSON.stringify(cart));
  renderCartPage();
  updateCartUI();
}

window.updateCartQty = updateCartQty;
window.removeCartItem = removeCartItem;
