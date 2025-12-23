// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', handleCheckout);
  }
});

function renderOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  const itemsContainer = document.getElementById('summaryItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutTotal');
  
  if (itemsContainer) {
    itemsContainer.innerHTML = cart.map(item => `
      <div class="summary-item">
        <div class="summary-item-image">
          ${item.image?.startsWith('http') ? `<img src="${item.image}" alt="${item.name}">` : ''}
        </div>
        <div class="summary-item-details">
          <h4>${item.name}</h4>
          <p>Qty: ${item.qty || 1}</p>
        </div>
        <span class="summary-item-price">$${((item.price || 0) * (item.qty || 1)).toFixed(2)}</span>
      </div>
    `).join('') || '<p>Your cart is empty</p>';
  }
  
  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;
  
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

async function handleCheckout(e) {
  e.preventDefault();
  
  const cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Collect form data
  const form = e.target;
  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
  const shippingCost = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shippingCost;
  
  // Prepare order data
  const orderData = {
    customer: {
      email: form.email.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value
    },
    shipping: {
      address: form.address.value,
      city: form.city.value,
      zip: form.zip.value,
      country: form.country.value
    },
    items: cart.map(item => ({
      productId: item.id,
      name: item.name,
      quantity: item.qty || 1,
      price: item.price
    })),
    subtotal: subtotal,
    shippingCost: shippingCost,
    total: total
  };
  
  try {
    // Submit order to backend
    const response = await fetch('api/orders.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Clear cart
      localStorage.setItem('talla_cart', JSON.stringify([]));
      
      // Show confirmation
      alert(`Order placed successfully!\n\nOrder Number: ${result.orderId}\n\nThank you for shopping with TALLA!`);
      
      // Redirect to home
      window.location.href = 'index.html';
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Order submission error:', error);
    alert('An error occurred while placing your order. Please try again.');
  }
}
