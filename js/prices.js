// CompareX Cross-Store Indian E-Commerce Price Engine
const storePriceData = {
  "sony-wh1000xm5": {
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    baseMSRP: 34990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    stores: [
      {
        storeName: "Amazon India",
        logoIcon: "fa-brands fa-amazon",
        listedPrice: 26990,
        shipping: 0,
        deliveryTime: "Tomorrow (Prime)",
        inStock: true,
        discountPercent: 23,
        url: "https://amazon.in"
      },
      {
        storeName: "Flipkart",
        logoIcon: "fa-solid fa-cart-shopping",
        listedPrice: 27499,
        shipping: 0,
        deliveryTime: "2 Days (Flipkart Plus)",
        inStock: true,
        discountPercent: 21,
        url: "https://flipkart.com"
      },
      {
        storeName: "Croma",
        logoIcon: "fa-solid fa-laptop",
        listedPrice: 26490,
        shipping: 0,
        deliveryTime: "Same Day Store Pickup / 24h",
        inStock: true,
        discountPercent: 24,
        url: "https://croma.com"
      },
      {
        storeName: "Reliance Digital",
        logoIcon: "fa-solid fa-bolt",
        listedPrice: 27990,
        shipping: 99,
        deliveryTime: "2-3 Days",
        inStock: true,
        discountPercent: 20,
        url: "https://reliancedigital.in"
      },
      {
        storeName: "Tata CLiQ",
        logoIcon: "fa-solid fa-bag-shopping",
        listedPrice: 34990,
        shipping: 0,
        deliveryTime: "3-4 Days",
        inStock: false,
        discountPercent: 0,
        url: "https://tatacliq.com"
      }
    ]
  },
  "ps5-slim": {
    name: "PlayStation 5 Slim Console (Disc Edition)",
    baseMSRP: 54990,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=60",
    stores: [
      {
        storeName: "Amazon India",
        logoIcon: "fa-brands fa-amazon",
        listedPrice: 49990,
        shipping: 0,
        deliveryTime: "Tomorrow (Prime)",
        inStock: true,
        discountPercent: 9,
        url: "https://amazon.in"
      },
      {
        storeName: "Flipkart",
        logoIcon: "fa-solid fa-cart-shopping",
        listedPrice: 48990,
        shipping: 0,
        deliveryTime: "2-3 Days",
        inStock: true,
        discountPercent: 11,
        url: "https://flipkart.com"
      },
      {
        storeName: "Croma",
        logoIcon: "fa-solid fa-laptop",
        listedPrice: 49490,
        shipping: 0,
        deliveryTime: "Next Day Express",
        inStock: true,
        discountPercent: 10,
        url: "https://croma.com"
      },
      {
        storeName: "Reliance Digital",
        logoIcon: "fa-solid fa-bolt",
        listedPrice: 49990,
        shipping: 0,
        deliveryTime: "2 Days",
        inStock: true,
        discountPercent: 9,
        url: "https://reliancedigital.in"
      },
      {
        storeName: "Vijay Sales",
        logoIcon: "fa-solid fa-store",
        listedPrice: 51990,
        shipping: 149,
        deliveryTime: "3-5 Days",
        inStock: true,
        discountPercent: 5,
        url: "https://vijaysales.com"
      }
    ]
  },
  "macbook-air-m3": {
    name: "Apple MacBook Air 13\" (M3 Chip, 16GB RAM, 512GB SSD)",
    baseMSRP: 134900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
    stores: [
      {
        storeName: "Croma",
        logoIcon: "fa-solid fa-laptop",
        listedPrice: 124900,
        shipping: 0,
        deliveryTime: "Express Delivery in 24h",
        inStock: true,
        discountPercent: 7,
        url: "https://croma.com"
      },
      {
        storeName: "Amazon India",
        logoIcon: "fa-brands fa-amazon",
        listedPrice: 126900,
        shipping: 0,
        deliveryTime: "Tomorrow",
        inStock: true,
        discountPercent: 6,
        url: "https://amazon.in"
      },
      {
        storeName: "Reliance Digital",
        logoIcon: "fa-solid fa-bolt",
        listedPrice: 125990,
        shipping: 0,
        deliveryTime: "2 Days",
        inStock: true,
        discountPercent: 7,
        url: "https://reliancedigital.in"
      },
      {
        storeName: "Flipkart",
        logoIcon: "fa-solid fa-cart-shopping",
        listedPrice: 129990,
        shipping: 0,
        deliveryTime: "2-3 Days",
        inStock: true,
        discountPercent: 4,
        url: "https://flipkart.com"
      },
      {
        storeName: "Tata CLiQ",
        logoIcon: "fa-solid fa-bag-shopping",
        listedPrice: 134900,
        shipping: 0,
        deliveryTime: "Available Today",
        inStock: true,
        discountPercent: 0,
        url: "https://tatacliq.com"
      }
    ]
  }
};

let currentItemKey = "sony-wh1000xm5";

document.addEventListener('DOMContentLoaded', () => {
  renderPriceComparison();

  document.getElementById('productSelectPicker')?.addEventListener('change', (e) => {
    currentItemKey = e.target.value;
    renderPriceComparison();
  });

  // Track price alert button
  document.getElementById('setAlertBtn')?.addEventListener('click', () => {
    const alertTarget = document.getElementById('targetPriceInput')?.value;
    if (alertTarget) {
      alert(`🔔 Price Alert Activated! We will notify you when price drops below ₹${Number(alertTarget).toLocaleString('en-IN')}.`);
    } else {
      alert("Please enter a valid target alert price in ₹.");
    }
  });
});

function renderPriceComparison() {
  const item = storePriceData[currentItemKey];
  if (!item) return;

  // Header display
  document.getElementById('productTitle').innerText = item.name;
  document.getElementById('productImage').src = item.image;
  document.getElementById('productMSRP').innerText = `₹${item.baseMSRP.toLocaleString('en-IN')}`;

  // Compute Total Cost (price + delivery)
  const evaluatedStores = item.stores.map(s => ({
    ...s,
    totalCost: s.listedPrice + s.shipping
  }));

  // Find lowest total cost among in-stock stores
  const inStockStores = evaluatedStores.filter(s => s.inStock);
  const lowestStore = inStockStores.reduce((prev, curr) => (prev.totalCost < curr.totalCost) ? prev : curr, inStockStores[0]);

  // Savings summary
  const maxSavings = item.baseMSRP - lowestStore.totalCost;
  const savingsBanner = document.getElementById('savingsBanner');
  if (savingsBanner) {
    savingsBanner.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <i class="fa-solid fa-tag" style="font-size:1.4rem; color:var(--c-amber-warm);"></i>
        <div>
          <h4 style="margin:0; font-size:1.1rem; color:#fff;">Lowest Price: <span style="color:var(--c-amber-warm);">₹${lowestStore.totalCost.toLocaleString('en-IN')}</span> on ${lowestStore.storeName}</h4>
          <p style="margin:0; font-size:0.85rem; color:var(--text-dim);">You save up to ₹${maxSavings.toLocaleString('en-IN')} (${Math.round((maxSavings/item.baseMSRP)*100)}% off MRP)!</p>
        </div>
      </div>
    `;
  }

  // Render Table with Indian Stores & Rupee Symbol
  const tableContainer = document.getElementById('storesTable');
  if (tableContainer) {
    let rows = evaluatedStores.map(s => {
      const isLowest = s.storeName === lowestStore.storeName && s.inStock;
      return `
        <tr class="${isLowest ? 'cell-highlight-best' : ''}">
          <td>
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <i class="${s.logoIcon}" style="font-size:1.2rem; color:var(--c-amber-warm);"></i>
              <strong style="color:#fff;">${s.storeName}</strong>
              ${isLowest ? '<span class="badge badge-winner" style="margin-left:0.5rem;"><i class="fa-solid fa-check"></i> Lowest Price</span>' : ''}
            </div>
          </td>
          <td style="font-size:1.05rem; font-weight:700; color:#fff;">₹${s.listedPrice.toLocaleString('en-IN')}</td>
          <td>${s.shipping === 0 ? '<span style="color:var(--c-amber-warm); font-weight:600;">FREE</span>' : `₹${s.shipping.toLocaleString('en-IN')}`}</td>
          <td style="font-size:1.15rem; font-weight:800; color:${isLowest ? 'var(--c-amber-warm)' : '#fff'};">₹${s.totalCost.toLocaleString('en-IN')}</td>
          <td style="font-size:0.85rem; color:var(--text-dim);">${s.deliveryTime}</td>
          <td>
            ${s.inStock 
              ? `<span style="color:var(--c-amber-warm); font-weight:600;"><i class="fa-solid fa-circle-check"></i> In Stock</span>` 
              : `<span style="color:var(--c-rose-rust); font-weight:600;"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>`}
          </td>
          <td>
            <a href="${s.url}" target="_blank" class="btn-card" style="padding:0.4rem 0.95rem; font-size:0.8rem;">
              Visit Store <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </td>
        </tr>
      `;
    }).join('');

    tableContainer.innerHTML = `
      <table class="comp-table">
        <thead>
          <tr>
            <th>Indian Store</th>
            <th>Base Price</th>
            <th>Shipping</th>
            <th>Total Cost</th>
            <th>Est. Delivery</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }
}
