// CompareX Movie Multi-Comparison & Recommendation Engine
const movieCatalog = [
  {
    id: "m1",
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    genre: ["Biography", "Drama", "History"],
    runtime: "180 min",
    runtimeMinutes: 180,
    imdbRating: 8.9,
    rottenTomatoes: "93%",
    metascore: 90,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=60",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    summary: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    strengths: ["Masterful non-linear narrative and sound design", "Award-winning acting ensemble", "Deep moral and political tension"],
    weaknesses: ["Long 3-hour runtime", "Dialogue heavy, demanding complete viewer focus"]
  },
  {
    id: "m2",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    runtime: "169 min",
    runtimeMinutes: 169,
    imdbRating: 8.7,
    rottenTomatoes: "73%",
    metascore: 74,
    poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=60",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    summary: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.",
    strengths: ["Unrivaled Hans Zimmer musical score", "Stunning visual depiction of black holes and relativity", "Emotional core between father and daughter"],
    weaknesses: ["Complex quantum theories can confuse viewers", "Sentimentality in third act divides critics"]
  },
  {
    id: "m3",
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    genre: ["Action", "Crime", "Drama"],
    runtime: "152 min",
    runtimeMinutes: 152,
    imdbRating: 9.0,
    rottenTomatoes: "94%",
    metascore: 84,
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop&q=60",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    summary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    strengths: ["Heath Ledger's legendary Oscar-winning Joker portrayal", "Pacing remains relentless throughout", "Groundbreaking practical stunts"],
    weaknesses: ["Somewhat convoluted third act with Two-Face", "Very dark and gritty for casual viewing"]
  },
  {
    id: "m4",
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    director: "Joaquim Dos Santos, Kemp Powers",
    genre: ["Animation", "Action", "Adventure"],
    runtime: "140 min",
    runtimeMinutes: 140,
    imdbRating: 8.6,
    rottenTomatoes: "95%",
    metascore: 86,
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&auto=format&fit=crop&q=60",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    summary: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    strengths: ["Revolutionary animation art styles", "Electrifying soundtrack and fast pacing", "Universal acclaim across critics and audiences"],
    weaknesses: ["Ends on a direct cliffhanger", "Hyper-dense visual stimuli might overwhelm some viewers"]
  },
  {
    id: "m5",
    title: "Dune: Part Two",
    year: 2024,
    director: "Denis Villeneuve",
    genre: ["Sci-Fi", "Action", "Adventure"],
    runtime: "166 min",
    runtimeMinutes: 166,
    imdbRating: 8.6,
    rottenTomatoes: "92%",
    metascore: 79,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    summary: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    strengths: ["Monumental sci-fi world-building and sound design", "Stunning desert cinematography by Greig Fraser", "Epic scale action battles"],
    weaknesses: ["Dense lore for casual newcomers", "Deliberate narrative pacing in middle act"]
  },
  {
    id: "m6",
    title: "Everything Everywhere All at Once",
    year: 2022,
    director: "Daniel Kwan, Daniel Scheinert",
    genre: ["Action", "Adventure", "Comedy"],
    runtime: "139 min",
    runtimeMinutes: 139,
    imdbRating: 7.8,
    rottenTomatoes: "94%",
    metascore: 81,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu"],
    summary: "A middle-aged Chinese immigrant is swept into an insane adventure in which she alone can save existence by exploring other universes.",
    strengths: ["Oscar-winning performances and original concept", "Absurdist humor balanced with deep family emotional core", "Fast-paced editing"],
    weaknesses: ["Bizarre humor may not appeal to all tastes", "Chaotic multiverse rules"]
  }
];

// Multi-movie selection array (default 3 films)
let selectedMovieIds = ["m1", "m2", "m4"];

document.addEventListener('DOMContentLoaded', () => {
  renderMoviePickers();
  renderMovieComparison();

  document.getElementById('movieMoodPref')?.addEventListener('change', () => {
    renderMovieComparison();
  });
});

function renderMoviePickers() {
  const container = document.getElementById('moviePickersContainer');
  if (!container) return;

  container.innerHTML = movieCatalog.map(m => {
    const isSelected = selectedMovieIds.includes(m.id);
    return `
      <div class="product-pick-card ${isSelected ? 'active-pick' : ''}" onclick="toggleMovieSelection('${m.id}')">
        <img src="${m.poster}" alt="${m.title}" style="height:60px; width:45px; object-fit:cover; border-radius:var(--radius-sm);">
        <div class="pick-info">
          <h4>${m.title}</h4>
          <span style="font-size:0.8rem; color:var(--c-amber-warm);">${m.year} • ★ ${m.imdbRating}</span>
        </div>
        <button class="pick-toggle-btn">${isSelected ? '✓ Added' : '+ Add'}</button>
      </div>
    `;
  }).join('');
}

function toggleMovieSelection(id) {
  if (selectedMovieIds.includes(id)) {
    if (selectedMovieIds.length <= 2) {
      alert("Please keep at least 2 movies to compare.");
      return;
    }
    selectedMovieIds = selectedMovieIds.filter(mid => mid !== id);
  } else {
    selectedMovieIds.push(id);
  }
  renderMoviePickers();
  renderMovieComparison();
}

function renderMovieComparison() {
  const selectedMovies = movieCatalog.filter(m => selectedMovieIds.includes(m.id));
  const pref = document.getElementById('movieMoodPref')?.value || 'ratings';

  if (selectedMovies.length === 0) return;

  // Determine Winner across multiple movies
  let winner = selectedMovies[0];
  let reason = "";

  if (pref === 'ratings') {
    winner = selectedMovies.reduce((prev, curr) => (curr.imdbRating > prev.imdbRating) ? curr : prev, selectedMovies[0]);
    reason = `Based on audience approval ratings, <strong>${winner.title}</strong> takes #1 with an IMDb rating of <strong>${winner.imdbRating}/10</strong> across the ${selectedMovies.length} compared films.`;
  } else if (pref === 'shorter') {
    winner = selectedMovies.reduce((prev, curr) => (curr.runtimeMinutes < prev.runtimeMinutes) ? curr : prev, selectedMovies[0]);
    reason = `For an easier, faster-paced watch tonight, <strong>${winner.title}</strong> is the shortest choice at <strong>${winner.runtime}</strong>.`;
  } else if (pref === 'action') {
    const actionMovies = selectedMovies.filter(m => m.genre.includes("Action"));
    if (actionMovies.length > 0) {
      winner = actionMovies.reduce((prev, curr) => (curr.imdbRating > prev.imdbRating) ? curr : prev, actionMovies[0]);
    } else {
      winner = selectedMovies[0];
    }
    reason = `For thrills, spectacle, and dynamic pacing, <strong>${winner.title}</strong> ranks highest in the action category.`;
  } else {
    winner = selectedMovies.reduce((prev, curr) => (parseFloat(curr.rottenTomatoes) > parseFloat(prev.rottenTomatoes)) ? curr : prev, selectedMovies[0]);
    reason = `Rotten Tomatoes critical consensus crowns <strong>${winner.title}</strong> with <strong>${winner.rottenTomatoes}</strong> Certified Fresh rating.`;
  }

  // Render Multi Movie Cards Grid
  const movieCardsContainer = document.getElementById('movieCardsContainer');
  if (movieCardsContainer) {
    movieCardsContainer.innerHTML = selectedMovies.map(m => {
      const isPick = m.id === winner.id;
      return `
        <div class="comp-col-card ${isPick ? 'winner-card' : ''}" style="text-align: left; align-items: stretch;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            ${isPick ? `<div class="badge badge-winner"><i class="fa-solid fa-star"></i> AI Top Recommendation</div>` : `<span></span>`}
            <button onclick="toggleMovieSelection('${m.id}')" style="background:none; border:none; color:var(--text-dim); cursor:pointer; font-size:1.1rem;" title="Remove movie">&times;</button>
          </div>

          <div style="display: flex; gap: 1rem; width: 100%;">
            <img src="${m.poster}" style="width: 90px; height: 135px; object-fit: cover; border-radius: var(--radius-sm); box-shadow: 0 4px 15px rgba(0,0,0,0.5);" alt="${m.title}">
            <div style="flex: 1;">
              <h3 style="font-size: 1.15rem; color:#fff; margin-bottom:0.2rem;">${m.title} <span style="font-size: 0.85rem; color: var(--text-dim);">(${m.year})</span></h3>
              <p style="color: var(--c-amber-warm); font-size: 0.8rem; margin-bottom: 0.4rem;"><i class="fa-solid fa-clapperboard"></i> ${m.director}</p>
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.4rem;">
                ${m.genre.map(g => `<span class="badge" style="background: rgba(102, 34, 73, 0.4); color: var(--c-blush-cream); font-size:0.68rem; padding:0.15rem 0.5rem;">${g}</span>`).join('')}
              </div>
            </div>
          </div>

          <div style="width: 100%; margin-top: 1rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; text-align: center; background: rgba(0,0,0,0.25); padding: 0.6rem; border-radius: var(--radius-sm);">
            <div><span style="font-size: 0.7rem; color: var(--text-dim);">IMDb</span><br><strong style="color: var(--c-amber-warm); font-size:0.88rem;">★ ${m.imdbRating}</strong></div>
            <div><span style="font-size: 0.7rem; color: var(--text-dim);">Rotten Tomatoes</span><br><strong style="color: var(--c-rose-rust); font-size:0.88rem;">${m.rottenTomatoes}</strong></div>
            <div><span style="font-size: 0.7rem; color: var(--text-dim);">Runtime</span><br><strong style="font-size:0.88rem;">${m.runtime}</strong></div>
          </div>

          <div style="width: 100%; margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.8rem; flex-grow:1;">
            <p style="font-size: 0.8rem; color: #fff; margin-bottom: 0.5rem;"><strong>Cast:</strong> ${m.cast.join(', ')}</p>
            <div>
              <strong style="font-size: 0.76rem; color: var(--c-amber-warm); text-transform: uppercase;">Strengths:</strong>
              <ul style="font-size: 0.78rem; color: var(--text-dim); padding-left: 1.1rem; margin-top: 0.2rem;">
                ${m.strengths.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Explainer
  const aiMovieBox = document.getElementById('aiMovieBox');
  if (aiMovieBox) {
    aiMovieBox.innerHTML = `
      <div class="ai-box-header">
        <i class="fa-solid fa-wand-magic-sparkles"></i> AI Multi-Movie Recommendation Rationale
      </div>
      <p>${reason}</p>
    `;
  }
}
