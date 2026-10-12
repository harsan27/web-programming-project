// CompareX Global Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation or global interactions can be attached here
  console.log('CompareX Platform Loaded.');

  // Quick search handler on index page
  const mainSearchInput = document.getElementById('mainSearchInput');
  const mainSearchBtn = document.getElementById('mainSearchBtn');

  if (mainSearchBtn && mainSearchInput) {
    const performSearch = () => {
      const q = mainSearchInput.value.trim().toLowerCase();
      if (!q) return;
      // Route based on keyword hints or default to products
      if (q.includes('movie') || q.includes('film') || q.includes('cinema') || q.includes('watch')) {
        window.location.href = `movies.html?search=${encodeURIComponent(q)}`;
      } else if (q.includes('price') || q.includes('store') || q.includes('deal') || q.includes('cheap')) {
        window.location.href = `prices.html?search=${encodeURIComponent(q)}`;
      } else {
        window.location.href = `products.html?search=${encodeURIComponent(q)}`;
      }
    };

    mainSearchBtn.addEventListener('click', performSearch);
    mainSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
});
