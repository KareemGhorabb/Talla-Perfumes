// Account Page JavaScript - Backend Connected
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('talla_user'));
  
  if (!user || !user.email) {
    // Not logged in, redirect to login
    window.location.href = 'login.html';
    return;
  }
  
  // Store user globally for other functions
  window.currentUser = user;
  
  // Display user info
  displayUserInfo(user);
  
  // Load orders from backend
  loadOrders(user.email);
  
  // Load saved scents from backend
  loadSavedScents(user.email);
  
  // Setup settings form
  setupSettingsForm(user);
  
  // Tab navigation
  setupTabNavigation();
  
  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
});

// Display user information
function displayUserInfo(user) {
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  
  if (userName) userName.textContent = user.name || 'Welcome';
  if (userEmail) userEmail.textContent = user.email;
}

// Load orders from backend API
async function loadOrders(email) {
  const container = document.getElementById('ordersContainer');
  if (!container) return;
  
  container.innerHTML = '<p style="text-align:center; color: var(--color-lavender);">Loading orders...</p>';
  
  try {
    const response = await fetch(`api/orders.php?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    
    if (data.success && data.orders && data.orders.length > 0) {
      container.innerHTML = data.orders.map(order => `
        <div class="order-card">
          <div class="order-header">
            <div>
              <div class="order-number">${order.order_id}</div>
              <small style="color: var(--color-lavender);">${formatDate(order.created_at)}</small>
            </div>
            <span class="order-status ${getStatusClass(order.status)}">${order.status || 'pending'}</span>
          </div>
          <div class="order-items">
            ${renderOrderItems(order.items)}
          </div>
          <div class="order-footer">
            <span style="color: var(--color-lavender);">${order.items?.length || 0} item(s)</span>
            <span class="order-total">$${parseFloat(order.total).toFixed(2)}</span>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
          <h3>No orders yet</h3>
          <p>When you place an order, it will appear here.</p>
          <a href="products.html" class="btn btn-primary" style="margin-top:1rem;">Start Shopping</a>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading orders:', error);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-exclamation-circle"></i></div>
        <h3>Unable to load orders</h3>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

// Render order items
function renderOrderItems(items) {
  if (!items || !Array.isArray(items)) return '';
  
  return items.map(item => `
    <div class="order-item-thumb" title="${item.name}">
      ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<i class="fa-solid fa-spray-can-sparkles"></i>`}
    </div>
  `).join('');
}

// Get status class for styling
function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case 'delivered': return 'delivered';
    case 'shipped': return 'shipped';
    case 'processing': return 'processing';
    default: return 'pending';
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Load saved scents from backend API
async function loadSavedScents(email) {
  const container = document.getElementById('scentsContainer');
  if (!container) return;
  
  console.log('Loading scents for email:', email);
  container.innerHTML = '<p style="text-align:center; color: var(--color-lavender);">Loading your scents...</p>';
  
  try {
    const url = `api/scents.php?email=${encodeURIComponent(email)}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url);
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch(e) {
      console.error('Failed to parse JSON:', e);
      container.innerHTML = '<p style="color:red;">Error loading scents. Check console.</p>';
      return;
    }
    
    console.log('Parsed data:', data);
    
    if (data.success && data.scents && data.scents.length > 0) {
      container.innerHTML = data.scents.map(scent => `
        <div class="scent-card" data-scent-id="${scent.id}">
          <div class="scent-header">
            <span class="scent-name">${scent.scent_name}</span>
            <div class="scent-actions">
              <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="addScentToCart(${scent.id})">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
              <button class="btn btn-secondary" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" onclick="deleteScent(${scent.id})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="scent-details">
            <div class="scent-notes-section">
              <span class="notes-label">Top Notes:</span>
              <div class="scent-notes">
                ${(scent.top_notes || []).map(note => `<span class="scent-note top">${note}</span>`).join('')}
              </div>
            </div>
            <div class="scent-notes-section">
              <span class="notes-label">Heart Notes:</span>
              <div class="scent-notes">
                ${(scent.middle_notes || []).map(note => `<span class="scent-note middle">${note}</span>`).join('')}
              </div>
            </div>
            <div class="scent-notes-section">
              <span class="notes-label">Base Notes:</span>
              <div class="scent-notes">
                ${(scent.base_notes || []).map(note => `<span class="scent-note base">${note}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="scent-footer">
            <span class="scent-intensity"><i class="fa-solid fa-droplet"></i> ${scent.intensity || 'balanced'}</span>
            <span class="scent-price">$${parseFloat(scent.price).toFixed(2)}</span>
            <span class="scent-date">${formatDate(scent.created_at)}</span>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-flask"></i></div>
          <h3>No custom scents yet</h3>
          <p>Create your signature fragrance in the Scent Lab!</p>
          <a href="scent-lab.html" class="btn btn-primary" style="margin-top:1rem;">Visit Scent Lab</a>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading scents:', error);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-exclamation-circle"></i></div>
        <h3>Unable to load scents</h3>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

// Add scent to cart
async function addScentToCart(scentId) {
  try {
    const user = window.currentUser;
    const response = await fetch(`api/scents.php?email=${encodeURIComponent(user.email)}`);
    const data = await response.json();
    
    const scent = data.scents?.find(s => s.id == scentId);
    if (!scent) {
      alert('Scent not found.');
      return;
    }
    
    // Add custom scent to cart
    let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
    cart.push({
      id: 'custom-' + scent.id + '-' + Date.now(),
      name: scent.scent_name,
      price: parseFloat(scent.price),
      qty: 1,
      type: 'custom',
      image: 'images/custom-scent.png',
      notes: [
        ...(scent.top_notes || []), 
        ...(scent.middle_notes || []), 
        ...(scent.base_notes || [])
      ]
    });
    localStorage.setItem('talla_cart', JSON.stringify(cart));
    
    showToast('Custom scent added to cart!', 'success');
    if (typeof updateCartUI === 'function') updateCartUI();
  } catch (error) {
    console.error('Error adding scent to cart:', error);
    showToast('Failed to add scent to cart.', 'error');
  }
}

// Delete a scent
async function deleteScent(scentId) {
  if (!confirm('Are you sure you want to delete this scent?')) return;
  
  try {
    const user = window.currentUser;
    const response = await fetch('api/scents.php', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: scentId, email: user.email })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Scent deleted successfully.', 'success');
      // Reload scents
      loadSavedScents(user.email);
    } else {
      showToast('Error: ' + data.message, 'error');
    }
  } catch (error) {
    console.error('Error deleting scent:', error);
    showToast('Failed to delete scent.', 'error');
  }
}

// Setup settings form
function setupSettingsForm(user) {
  const firstNameInput = document.getElementById('settingsFirstName');
  const lastNameInput = document.getElementById('settingsLastName');
  const emailInput = document.getElementById('settingsEmail');
  
  // Pre-fill form with user data
  if (user.name) {
    const nameParts = user.name.split(' ');
    if (firstNameInput) firstNameInput.value = nameParts[0] || '';
    if (lastNameInput) lastNameInput.value = nameParts.slice(1).join(' ') || '';
  }
  if (emailInput) emailInput.value = user.email || '';
  
  // Handle form submission
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const updatedUser = {
        ...user,
        name: `${firstNameInput.value} ${lastNameInput.value}`.trim(),
        email: emailInput.value
      };
      
      // Save to localStorage (in a real app, this would call the backend)
      localStorage.setItem('talla_user', JSON.stringify(updatedUser));
      window.currentUser = updatedUser;
      displayUserInfo(updatedUser);
      
      showToast('Profile updated successfully!', 'success');
    });
  }
}

// Tab navigation
function setupTabNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-section]');
  const sections = document.querySelectorAll('.account-section');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetSection = item.dataset.section;
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Update active section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
          section.classList.add('active');
        }
      });
    });
  });
  
  // Handle hash links
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    const targetItem = document.querySelector(`.nav-item[data-section="${hash}"]`);
    if (targetItem) targetItem.click();
  }
}

// Logout handler
function handleLogout() {
  if (confirm('Are you sure you want to sign out?')) {
    localStorage.removeItem('talla_user');
    window.location.href = 'login.html';
  }
}

// Make functions globally available
window.addScentToCart = addScentToCart;
window.deleteScent = deleteScent;
