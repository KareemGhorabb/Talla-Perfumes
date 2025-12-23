// Quiz Page JavaScript
const quizData = {
  mood: null, personality: null, age: null, gender: null, lifestyle: null, season: null
};
const fields = ['mood', 'personality', 'age', 'gender', 'lifestyle', 'season'];
let currentStep = 1;
const totalSteps = 6;

const steps = document.querySelectorAll('.quiz-step');
const progressDots = document.querySelectorAll('.progress-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Option selection
document.querySelectorAll('.quiz-option').forEach(opt => {
  opt.addEventListener('click', function() {
    const step = this.closest('.quiz-step');
    step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
    quizData[fields[currentStep - 1]] = this.dataset.value;
    nextBtn.disabled = false;
  });
});

// Navigation
prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps) {
    currentStep++;
    updateUI();
  } else {
    showResults();
  }
});

function updateUI() {
  steps.forEach(s => s.classList.remove('active'));
  document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');

  progressDots.forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i < currentStep - 1) dot.classList.add('completed');
    if (i === currentStep - 1) dot.classList.add('active');
  });

  prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
  nextBtn.textContent = currentStep === totalSteps ? 'See My Match ✨' : 'Next →';
  
  // Check if current step has selection
  const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  const hasSelection = currentStepEl.querySelector('.quiz-option.selected');
  nextBtn.disabled = !hasSelection;
}

function showResults() {
  document.getElementById('quizNav').style.display = 'none';
  document.querySelector('.quiz-progress').style.display = 'none';
  steps.forEach(s => s.classList.remove('active'));
  document.querySelector('[data-step="result"]').classList.add('active');

  // AI Matching Logic
  const match = calculateMatch();
  const alt = getAlternative(match);

  document.getElementById('resultCard').innerHTML = `
    <div class="result-bottle"><img src="${match.image}" alt="${match.name}"></div>
    <h2 class="result-name">${match.name}</h2>
    <p class="result-tagline">"${match.description}"</p>
    <p class="result-story">Based on your ${quizData.mood} mood, ${quizData.personality} personality, and preference for ${quizData.lifestyle} occasions, we've matched you with this ${match.category} fragrance that perfectly captures your essence.</p>
    <div class="result-notes">
      ${match.top.map(n => `<span class="result-note">${n}</span>`).join('')}
      ${match.middle.map(n => `<span class="result-note">${n}</span>`).join('')}
    </div>
    <p class="result-price">$${match.price}</p>
    <div class="result-actions">
      <button class="btn btn-primary" onclick="addToCartQuiz('${match.id}')">Add to Cart</button>
      <a href="product.html?id=${match.id}" class="btn btn-secondary">View Details</a>
    </div>
  `;

  document.getElementById('alternative').innerHTML = `
    <h4>💡 You might also love...</h4>
    <p>If you love ${match.name}, you might love <strong>${alt.name}</strong></p>
    <a href="product.html?id=${alt.id}" class="btn btn-secondary" style="margin-top: 0.5rem;">Try ${alt.name}</a>
    <br><br>
    <button onclick="retakeQuiz()" class="btn btn-glass">🔄 Try Another Match</button>
  `;
}

function calculateMatch() {
  const products = window.TALLA?.products || [];
  let scores = products.map(p => ({ product: p, score: 0 }));

  scores.forEach(s => {
    // Mood matching
    if (quizData.mood === 'romantic' && (s.product.category === 'floral' || s.product.notes.includes('Rose'))) s.score += 3;
    if (quizData.mood === 'bold' && (s.product.category === 'oriental' || s.product.category === 'woody')) s.score += 3;
    if (quizData.mood === 'fresh' && s.product.category === 'fresh') s.score += 3;
    if (quizData.mood === 'mysterious' && s.product.notes.includes('Oud')) s.score += 3;

    // Gender matching
    if (quizData.gender === 'feminine' && s.product.category === 'floral') s.score += 2;
    if (quizData.gender === 'masculine' && s.product.category === 'woody') s.score += 2;

    // Season matching
    if (quizData.season === 'summer' && s.product.category === 'fresh') s.score += 2;
    if (quizData.season === 'winter' && (s.product.category === 'oriental' || s.product.category === 'woody')) s.score += 2;
    if (quizData.season === 'spring' && s.product.category === 'floral') s.score += 2;

    // Lifestyle
    if (quizData.lifestyle === 'date' && s.product.notes.includes('Rose')) s.score += 2;
    if (quizData.lifestyle === 'party' && s.product.badge === 'TRENDING') s.score += 2;
    if (quizData.lifestyle === 'special' && s.product.price >= 130) s.score += 2;
  });

  scores.sort((a, b) => b.score - a.score);
  return scores[0]?.product || products[0];
}

function getAlternative(match) {
  const products = window.TALLA?.products || [];
  const alternatives = products.filter(p => p.id !== match.id && p.category === match.category);
  return alternatives[0] || products.find(p => p.id !== match.id) || match;
}

function retakeQuiz() {
  Object.keys(quizData).forEach(k => quizData[k] = null);
  currentStep = 1;
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  document.getElementById('quizNav').style.display = 'flex';
  document.querySelector('.quiz-progress').style.display = 'flex';
  updateUI();
}

function addToCartQuiz(productId) {
  const products = window.TALLA?.products || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  let cart = JSON.parse(localStorage.getItem('talla_cart')) || [];
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('talla_cart', JSON.stringify(cart));
  alert('Added to cart! 🛒');
}
