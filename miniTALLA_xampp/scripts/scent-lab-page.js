// Scent Lab Page JavaScript
const selectedNotes = { top: [], middle: [], base: [] };
const premiumNotes = ['Oud', 'Rose', 'Orchid', 'Iris'];
const basePrice = 89;
let customName = '';

// Note name generators
const namePatterns = {
  romantic: ['Velvet', 'Whisper', 'Dream', 'Desire', 'Embrace'],
  fresh: ['Breeze', 'Dawn', 'Clarity', 'Azure', 'Mist'],
  woody: ['Shadow', 'Forest', 'Eclipse', 'Noir', 'Ember'],
  oriental: ['Mystic', 'Arabian', 'Nights', 'Luxe', 'Divine']
};

// Initialize
document.querySelectorAll('.note-item').forEach(item => {
  item.addEventListener('click', () => toggleNote(item));
});

document.getElementById('customName').addEventListener('input', (e) => {
  customName = e.target.value;
  updateBottleName();
  updateButtons();
});

function toggleNote(item) {
  const note = item.dataset.note;
  const layer = item.closest('.note-grid').dataset.layer;
  const maxPerLayer = 2;

  if (item.classList.contains('selected')) {
    item.classList.remove('selected');
    selectedNotes[layer] = selectedNotes[layer].filter(n => n !== note);
  } else {
    if (selectedNotes[layer].length >= maxPerLayer) {
      // Remove oldest selection
      const oldNote = selectedNotes[layer].shift();
      document.querySelector(`.note-item[data-note="${oldNote}"]`).classList.remove('selected');
    }
    item.classList.add('selected');
    selectedNotes[layer].push(note);
  }

  updateUI();
}

function updateUI() {
  updateSelectedNotes();
  updateScentFamily();
  updatePrice();
  updateBottle();
  generateAINames();
  updateBottleName();
  updateButtons();
}

function updateSelectedNotes() {
  const container = document.getElementById('selectedNotes');
  const allNotes = [...selectedNotes.top, ...selectedNotes.middle, ...selectedNotes.base];
  container.innerHTML = allNotes.map(n => `<span class="selected-note">${n}</span>`).join('');
}

function updateScentFamily() {
  const el = document.getElementById('scentFamily');
  const all = [...selectedNotes.top, ...selectedNotes.middle, ...selectedNotes.base];
  
  if (all.length === 0) {
    el.textContent = 'Select notes to begin';
    return;
  }

  // Determine family
  const florals = ['Rose', 'Jasmine', 'Orchid', 'Lavender', 'Iris', 'Neroli'];
  const woods = ['Oud', 'Sandalwood', 'Cedar'];
  const oriental = ['Vanilla', 'Amber', 'Musk'];
  const fresh = ['Bergamot', 'Lemon', 'Grapefruit', 'Apple', 'Pear'];

  let floralCount = all.filter(n => florals.includes(n)).length;
  let woodCount = all.filter(n => woods.includes(n)).length;
  let orientalCount = all.filter(n => oriental.includes(n)).length;
  let freshCount = all.filter(n => fresh.includes(n)).length;

  let family = 'Unique Blend';
  let max = Math.max(floralCount, woodCount, orientalCount, freshCount);
  if (max > 0) {
    if (floralCount === max) family = '<i class="fa-solid fa-spa"></i> Floral';
    else if (woodCount === max) family = '<i class="fa-solid fa-tree"></i> Woody';
    else if (orientalCount === max) family = '<i class="fa-solid fa-star"></i> Oriental';
    else if (freshCount === max) family = '<i class="fa-solid fa-lemon"></i> Fresh';
  }

  el.innerHTML = family;
}

function updatePrice() {
  const all = [...selectedNotes.top, ...selectedNotes.middle, ...selectedNotes.base];
  const premiumCount = all.filter(n => premiumNotes.includes(n)).length;
  const premium = premiumCount * 15;
  const total = basePrice + premium;

  document.getElementById('premiumPrice').textContent = `$${premium.toFixed(2)}`;
  document.getElementById('totalPrice').textContent = total;
  document.getElementById('finalPrice').textContent = total;
}

function updateBottle() {
  const bottle3d = document.getElementById('bottle3d');
  const waves = document.getElementById('scentWaves');
  const shimmer = document.getElementById('bottleShimmer');
  const labelName = document.getElementById('labelName');
  const labelFamily = document.getElementById('labelFamily');
  const all = [...selectedNotes.top, ...selectedNotes.middle, ...selectedNotes.base];

  // Update label name and family
  const name = customName || (window.currentAIName || 'Your Creation');
  labelName.textContent = name;
  
  // Get family text
  const florals = ['Rose', 'Jasmine', 'Orchid', 'Lavender', 'Iris', 'Neroli'];
  const woods = ['Oud', 'Sandalwood', 'Cedar'];
  const oriental = ['Vanilla', 'Amber', 'Musk'];
  const fresh = ['Bergamot', 'Lemon', 'Grapefruit', 'Apple', 'Pear'];
  
  let familyText = 'Custom Blend';
  if (all.length > 0) {
    let floralCount = all.filter(n => florals.includes(n)).length;
    let woodCount = all.filter(n => woods.includes(n)).length;
    let orientalCount = all.filter(n => oriental.includes(n)).length;
    let freshCount = all.filter(n => fresh.includes(n)).length;
    let max = Math.max(floralCount, woodCount, orientalCount, freshCount);
    if (max > 0) {
      if (floralCount === max) familyText = 'Floral';
      else if (woodCount === max) familyText = 'Woody';
      else if (orientalCount === max) familyText = 'Oriental';
      else if (freshCount === max) familyText = 'Fresh';
    }
  }
  labelFamily.textContent = familyText;

  // Show/hide shimmer based on selection
  if (all.length > 0) {
    shimmer.style.display = 'block';
  } else {
    shimmer.style.display = 'none';
  }

  // Generate scent waves
  waves.innerHTML = '';
  all.forEach((note, i) => {
    const item = document.querySelector(`.note-item[data-note="${note}"]`);
    const noteColor = item?.dataset.color || '#D4AF37';
    for (let j = 0; j < 3; j++) {
      const wave = document.createElement('div');
      wave.className = 'wave';
      wave.style.background = noteColor;
      wave.style.left = (Math.random() * 60 - 30) + 'px';
      wave.style.animationDelay = (i * 0.3 + j * 0.5) + 's';
      waves.appendChild(wave);
    }
  });
}

// Color Selector
function initColorSelector() {
  const colorOptions = document.querySelectorAll('.color-option');
  const bottle3d = document.getElementById('bottle3d');
  
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      colorOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      
      const color = option.dataset.color;
      const darkColor = option.dataset.dark;
      
      bottle3d.style.setProperty('--bottle-color', color);
      bottle3d.style.setProperty('--bottle-color-dark', darkColor);
    });
  });
}

// Initialize color selector
initColorSelector();

function generateAINames() {
  const container = document.getElementById('aiNames');
  const all = [...selectedNotes.top, ...selectedNotes.middle, ...selectedNotes.base];

  if (all.length === 0) {
    container.innerHTML = '<span class="ai-name">Select notes to generate names...</span>';
    return;
  }

  // Get scent family for name generation
  const florals = ['Rose', 'Jasmine', 'Orchid', 'Lavender', 'Iris'];
  const woods = ['Oud', 'Sandalwood', 'Cedar'];
  
  let category = 'romantic';
  if (all.some(n => woods.includes(n))) category = 'woody';
  else if (all.some(n => florals.includes(n))) category = 'romantic';
  else if (all.includes('Amber') || all.includes('Vanilla')) category = 'oriental';
  else category = 'fresh';

  const prefixes = namePatterns[category];
  const suffixes = ['Essence', 'Aura', 'Elixir', 'Noir', 'Bloom', all[0] || 'Love'];

  const names = [];
  for (let i = 0; i < 4; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    names.push(`${prefix} ${suffix}`);
  }

  container.innerHTML = names.map(name => 
    `<span class="ai-name" onclick="selectAIName('${name}')">${name}</span>`
  ).join('');
  
  // Store first name as default
  if (!customName && names.length > 0) {
    window.currentAIName = names[0];
    updateBottle();
  }
}

function selectAIName(name) {
  document.querySelectorAll('.ai-name').forEach(n => n.classList.remove('selected'));
  event.target.classList.add('selected');
  customName = name;
  document.getElementById('customName').value = name;
  updateBottleName();
  updateButtons();
}

function updateBottleName() {
  const el = document.getElementById('bottleName');
  const name = customName || window.currentAIName || 'Your Creation';
  el.textContent = name;
  // Also update the label on the bottle
  document.getElementById('labelName').textContent = name;
}

function updateButtons() {
  const all = [...selectedNotes.top, ...selectedNotes.middle, ...selectedNotes.base];
  const hasNotes = all.length >= 3;
  // Allow either custom name OR AI-generated name
  const hasName = (customName && customName.trim().length > 0) || (window.currentAIName && window.currentAIName.trim().length > 0);

  document.getElementById('orderBtn').disabled = !hasNotes;
  document.getElementById('saveBtn').disabled = !hasNotes;
}

// Order button
document.getElementById('orderBtn').addEventListener('click', () => {
  const activeColor = document.querySelector('.color-option.active');
  const scent = {
    id: Date.now(),
    name: customName || window.currentAIName,
    notes: {...selectedNotes},
    price: parseInt(document.getElementById('finalPrice').textContent),
    type: 'custom',
    bottleColor: activeColor ? activeColor.dataset.color : '#D4AF37',
    image: 'https://images.unsplash.com/photo-1705899853374-d91c048b81d2?w=400'
  };

  // Add to cart
  let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  cart.push({ ...scent, qty: 1 });
  localStorage.setItem('talla_cart', JSON.stringify(cart));

  // Redirect to cart (no need for alert)
  window.location.href = 'cart.html';
});

// Save button - saves to backend
document.getElementById('saveBtn').addEventListener('click', async () => {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('talla_user'));
  
  console.log('Save button clicked');
  console.log('User data:', user);
  
  if (!user || !user.email) {
    if (confirm('You need to be logged in to save your scent. Would you like to sign in now?')) {
      // Save current scent to localStorage temporarily so user doesn't lose work
      const tempScent = {
        name: customName || window.currentAIName,
        notes: {...selectedNotes},
        price: parseInt(document.getElementById('finalPrice').textContent)
      };
      localStorage.setItem('talla_temp_scent', JSON.stringify(tempScent));
      window.location.href = 'login.html';
    }
    return;
  }
  
  const activeColor = document.querySelector('.color-option.active');
  const name = customName || window.currentAIName;
  const price = parseInt(document.getElementById('finalPrice').textContent);
  
  // Determine intensity based on notes count
  const allNotes = [...selectedNotes.top, ...selectedNotes.middle, ...selectedNotes.base];
  let intensity = 'light';
  if (allNotes.length >= 5) intensity = 'intense';
  else if (allNotes.length >= 3) intensity = 'balanced';
  
  // Prepare data for backend
  const scentData = {
    email: user.email,
    name: name,
    notes: allNotes,
    topNotes: selectedNotes.top,
    middleNotes: selectedNotes.middle,
    baseNotes: selectedNotes.base,
    intensity: intensity,
    price: price
  };
  
  console.log('Sending scent data:', scentData);
  
  try {
    const response = await fetch('api/scents.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scentData)
    });
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      alert('Server error. Check console for details.');
      return;
    }
    
    console.log('Parsed result:', result);
    
    if (result.success) {
      // Redirect to scent saved success page
      window.location.href = `scent-saved.html?name=${encodeURIComponent(name)}&price=${price}`;
    } else {
      alert('Error saving scent: ' + result.message);
    }
  } catch (error) {
    console.error('Error saving scent:', error);
    alert('Failed to save scent. Please try again. Error: ' + error.message);
  }
});

