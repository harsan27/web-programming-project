// CompareX Products Multi-Comparison & Scoring Engine
const productCatalog = [
  {
    id: "p1",
    name: "Apple iPhone 15 Pro",
    category: "Smartphones",
    brand: "Apple",
    price: 134900,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60",
    specs: {
      display: "6.1\" Super Retina XDR OLED 120Hz",
      processor: "A17 Pro (3nm)",
      ramStorage: "8GB RAM / 128GB Storage",
      camera: "48MP Main + 12MP Ultra-wide + 12MP 3x Telephoto",
      battery: "3274 mAh (Up to 23h video)",
      weight: "187 g",
      os: "iOS 17"
    },
    scores: {
      performance: 98,
      camera: 96,
      battery: 84,
      display: 95,
      value: 80
    },
    pros: ["A17 Pro industry-leading single-core speed", "Premium Grade 5 Titanium build", "Action Button customization"],
    cons: ["Battery capacity smaller than competitors", "Slow 20W wired charging speed", "Expensive storage upgrades"]
  },
  {
    id: "p2",
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    brand: "Samsung",
    price: 129999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60",
    specs: {
      display: "6.8\" Dynamic LTPO AMOLED 2X 120Hz Flat",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      ramStorage: "12GB RAM / 256GB Storage",
      camera: "200MP Main + 50MP 5x Tele + 10MP 3x + 12MP Ultra",
      battery: "5000 mAh (45W fast charge)",
      weight: "232 g",
      os: "Android 14 (One UI 6.1)"
    },
    scores: {
      performance: 96,
      camera: 97,
      battery: 94,
      display: 99,
      value: 78
    },
    pros: ["Integrated S-Pen stylus and anti-reflective display", "Versatile 200MP quad zoom camera setup", "Huge 5000mAh battery life"],
    cons: ["Heavy and boxy ergonomics", "Top-tier price point (₹1,29,999)", "AI processing takes learning curve"]
  },
  {
    id: "p3",
    name: "Google Pixel 8 Pro",
    category: "Smartphones",
    brand: "Google",
    price: 79999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
    specs: {
      display: "6.7\" Super Actua LTPO OLED 120Hz",
      processor: "Google Tensor G3",
      ramStorage: "12GB RAM / 128GB Storage",
      camera: "50MP Main + 48MP Ultra-wide + 48MP 5x Telephoto",
      battery: "5050 mAh (30W fast charge)",
      weight: "213 g",
      os: "Android 14 (Stock Google)"
    },
    scores: {
      performance: 85,
      camera: 95,
      battery: 86,
      display: 94,
      value: 92
    },
    pros: ["Best-in-class computational photography", "7 years of official OS software updates", "Substantial value under ₹80,000"],
    cons: ["Tensor G3 throttles under sustained 3D gaming", "Charging speeds lag behind rivals", "Fingerprint sensor can be finicky"]
  },
  {
    id: "p4",
    name: "OnePlus 12",
    category: "Smartphones",
    brand: "OnePlus",
    price: 64999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
    specs: {
      display: "6.82\" 2K LTPO AMOLED 120Hz (4500 nits peak)",
      processor: "Snapdragon 8 Gen 3",
      ramStorage: "16GB RAM / 512GB Storage",
      camera: "50MP Sony LYT-808 + 64MP 3x Periscope + 48MP Ultra",
      battery: "5400 mAh (100W SuperVOOC included)",
      weight: "220 g",
      os: "OxygenOS 14"
    },
    scores: {
      performance: 96,
      camera: 90,
      battery: 98,
      display: 96,
      value: 97
    },
    pros: ["Insane 100W charging + huge 5400mAh battery", "Flagship Snapdragon 8 Gen 3 at just ₹64,999", "16GB RAM included standard"],
    cons: ["Curved screen edges not favored by all", "IP65 water resistance (not full IP68)", "Hasselblad color profile inconsistent at night"]
  },
  {
    id: "p5",
    name: "Sony Xperia 1 VI",
    category: "Smartphones",
    brand: "Sony",
    price: 114990,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=60",
    specs: {
      display: "6.5\" FHD+ OLED 120Hz 19.5:9",
      processor: "Snapdragon 8 Gen 3",
      ramStorage: "12GB RAM / 256GB Storage",
      camera: "48MP Main + 12MP 85-170mm Continuous Optical Zoom + 12MP Ultra",
      battery: "5000 mAh (Up to 48h runtime)",
      weight: "192 g",
      os: "Android 14"
    },
    scores: {
      performance: 94,
      camera: 95,
      battery: 96,
      display: 89,
      value: 75
    },
    pros: ["True continuous optical telephoto zoom (3.5x-7.1x)", "3.5mm headphone jack & microSD expansion slot", "Remarkable 2-day battery endurance"],
    cons: ["Dropped 4K display down to FHD+", "Very premium pricing", "Camera app requires photography knowledge"]
  },
  {
    id: "p6",
    name: "Xiaomi 14 Ultra",
    category: "Smartphones",
    brand: "Xiaomi",
    price: 99999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&auto=format&fit=crop&q=60",
    specs: {
      display: "6.73\" 120Hz LTPO AMOLED 3000 nits",
      processor: "Snapdragon 8 Gen 3",
      ramStorage: "16GB RAM / 512GB Storage",
      camera: "Quad 50MP Leica Optics (1-inch LYT-900 Variable Aperture)",
      battery: "5000 mAh (90W Wired + 80W Wireless)",
      weight: "220 g",
      os: "HyperOS (Android 14)"
    },
    scores: {
      performance: 96,
      camera: 98,
      battery: 91,
      display: 95,
      value: 86
    },
    pros: ["1-inch sensor with step-less variable aperture", "Full Leica photographic tuning profile", "Blazing 90W fast charging"],
    cons: ["Prominent camera bump", "Software skin has bloatware", "Limited service centers"]
  }
];

let selectedProductIds = ["p1", "p2", "p3"];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProductSelectors();
  renderComparison();

  // Listen for preference changes
  document.getElementById('priorityFilter')?.addEventListener('change', () => {
    renderComparison();
  });

  const budgetSlider = document.getElementById('budgetRange');
  if (budgetSlider) {
    budgetSlider.addEventListener('input', (e) => {
      document.getElementById('budgetValue').innerText = `₹${Number(e.target.value).toLocaleString('en-IN')}`;
      filterProductsByBudget(Number(e.target.value));
    });
  }
});

function renderProductSelectors() {
  const container = document.getElementById('selectorsContainer');
  if (!container) return;

  container.innerHTML = productCatalog.map(p => {
    const isSelected = selectedProductIds.includes(p.id);
    return `
      <div class="product-pick-card ${isSelected ? 'active-pick' : ''}" onclick="toggleProductSelection('${p.id}')">
        <img src="${p.image}" alt="${p.name}">
        <div class="pick-info">
          <h4>${p.name}</h4>
          <span class="pick-price">₹${p.price.toLocaleString('en-IN')}</span>
        </div>
        <button class="pick-toggle-btn">${isSelected ? '✓ Selected' : '+ Compare'}</button>
      </div>
    `;
  }).join('');
}

function toggleProductSelection(id) {
  if (selectedProductIds.includes(id)) {
    if (selectedProductIds.length <= 2) {
      alert("Please keep at least 2 products selected to compare.");
      return;
    }
    selectedProductIds = selectedProductIds.filter(pid => pid !== id);
  } else {
    selectedProductIds.push(id);
  }
  renderProductSelectors();
  renderComparison();
}

function renderComparison() {
  const items = productCatalog.filter(p => selectedProductIds.includes(p.id));
  const priority = document.getElementById('priorityFilter')?.value || 'balanced';

  // Calculate Weighted Scores
  const weights = {
    balanced: { perf: 0.25, cam: 0.25, bat: 0.25, val: 0.25 },
    gaming: { perf: 0.50, cam: 0.10, bat: 0.30, val: 0.10 },
    camera: { perf: 0.15, cam: 0.55, bat: 0.15, val: 0.15 },
    battery: { perf: 0.15, cam: 0.15, bat: 0.50, val: 0.20 },
    value: { perf: 0.15, cam: 0.15, bat: 0.20, val: 0.50 }
  }[priority];

  const evaluated = items.map(p => {
    const totalScore = Math.round(
      (p.scores.performance * weights.perf) +
      (p.scores.camera * weights.cam) +
      (p.scores.battery * weights.bat) +
      (p.scores.value * weights.val)
    );
    return { ...p, calculatedScore: totalScore };
  });

  // Find winner
  let winner = evaluated.reduce((prev, current) => (prev.calculatedScore > current.calculatedScore) ? prev : current);

  // Render Multi-Item Column Cards with Rupees (₹)
  const cardsContainer = document.getElementById('comparisonCards');
  if (cardsContainer) {
    cardsContainer.innerHTML = evaluated.map(p => {
      const isWinner = p.id === winner.id;
      return `
        <div class="comp-col-card ${isWinner ? 'winner-card' : ''}">
          <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom: 0.6rem;">
            ${isWinner ? `<div class="badge badge-winner"><i class="fa-solid fa-crown"></i> Overall Winner</div>` : `<span></span>`}
            <button onclick="toggleProductSelection('${p.id}')" style="background:none; border:none; color:var(--text-dim); cursor:pointer; font-size:1.1rem;" title="Remove from comparison">&times;</button>
          </div>
          <img src="${p.image}" class="comp-img" alt="${p.name}">
          <h3 style="font-size: 1.15rem; margin-top: 0.5rem; color:#fff;">${p.name}</h3>
          <p class="price-tag">₹${p.price.toLocaleString('en-IN')} <span style="font-size: 0.8rem; color: var(--text-dim); font-weight: 400;">(${p.rating} ★)</span></p>

          <div style="margin: 1.2rem 0; width: 100%;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom: 0.3rem;">
              <span>Match Rating</span>
              <span style="color: ${isWinner ? 'var(--c-amber-warm)' : '#fff'};">${p.calculatedScore}%</span>
            </div>
            <div class="score-progress" style="height: 8px;">
              <div class="score-fill ${isWinner ? 'green' : ''}" style="width: ${p.calculatedScore}%;"></div>
            </div>
          </div>

          <div class="mini-scores">
            <div class="score-row"><span>Performance</span><strong>${p.scores.performance}</strong></div>
            <div class="score-row"><span>Camera</span><strong>${p.scores.camera}</strong></div>
            <div class="score-row"><span>Battery Life</span><strong>${p.scores.battery}</strong></div>
            <div class="score-row"><span>Value for Money</span><strong>${p.scores.value}</strong></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Detailed Multi-Item Specs Table
  const tableContainer = document.getElementById('specsTable');
  if (tableContainer) {
    const specKeys = [
      { label: "Price (INR)", key: "priceFormatted" },
      { label: "Display", key: "display" },
      { label: "Processor", key: "processor" },
      { label: "RAM & Storage", key: "ramStorage" },
      { label: "Camera Setup", key: "camera" },
      { label: "Battery & Charging", key: "battery" },
      { label: "Weight", key: "weight" },
      { label: "Operating System", key: "os" }
    ];

    let headerRow = `<tr><th>Specification</th>` + evaluated.map(p => `<th>${p.name}</th>`).join('') + `</tr>`;
    let rows = specKeys.map(spec => {
      let rowCells = evaluated.map(p => {
        if (spec.key === "priceFormatted") return `<td style="color:var(--c-amber-warm); font-weight:700;">₹${p.price.toLocaleString('en-IN')}</td>`;
        return `<td>${p.specs[spec.key]}</td>`;
      }).join('');
      return `<tr><td><strong style="color:#fff;">${spec.label}</strong></td>${rowCells}</tr>`;
    }).join('');

    let prosRow = `<tr><td><strong style="color:var(--c-amber-warm)">Top Advantages</strong></td>` +
      evaluated.map(p => `<td><ul style="padding-left:1.2rem; font-size:0.85rem; color:var(--text-dim);">${p.pros.map(pr => `<li>${pr}</li>`).join('')}</ul></td>`).join('') + `</tr>`;

    let consRow = `<tr><td><strong style="color:var(--c-rose-rust)">Trade-offs</strong></td>` +
      evaluated.map(p => `<td><ul style="padding-left:1.2rem; font-size:0.85rem; color:var(--text-dim);">${p.cons.map(cn => `<li>${cn}</li>`).join('')}</ul></td>`).join('') + `</tr>`;

    tableContainer.innerHTML = `<table class="comp-table">${headerRow}${rows}${prosRow}${consRow}</table>`;
  }

  // AI Recommendation Engine Summary
  const aiBox = document.getElementById('aiRecommendationBox');
  if (aiBox) {
    let explanation = `Across the <strong>${evaluated.length} compared devices</strong> with focus set to <strong>${priority.toUpperCase()}</strong>, the <strong>${winner.name}</strong> leads the group with an aggregate index of <strong>${winner.calculatedScore}/100</strong>. `;
    if (priority === 'value') {
      explanation += `It provides the strongest price-to-specification ratio in Indian Rupees (₹) for the money.`;
    } else if (priority === 'camera') {
      explanation += `Its optics and post-processing sensors outperform the other contenders in dynamic range and detail capture.`;
    } else if (priority === 'battery') {
      explanation += `Its efficiency and power cell size deliver the longest endurance among all selected models.`;
    } else {
      explanation += `It provides the most coherent blend of processor throughput, screen fidelity, and longevity.`;
    }
    aiBox.innerHTML = `
      <div class="ai-box-header">
        <i class="fa-solid fa-brain"></i> AI Multi-Device Evaluation Rationale
      </div>
      <p>${explanation}</p>
    `;
  }
}

function filterProductsByBudget(maxPrice) {
  const cards = document.querySelectorAll('.product-pick-card');
  productCatalog.forEach((p, idx) => {
    if (cards[idx]) {
      if (p.price > maxPrice) {
        cards[idx].style.opacity = '0.35';
      } else {
        cards[idx].style.opacity = '1';
      }
    }
  });
}
