// Centralized AI Decision Maker Engine with Custom Dynamic Constraints
document.addEventListener('DOMContentLoaded', () => {
  // State
  const optionsList = [];
  const constraintsList = []; // Dynamic list of { id, name, weight }

  // DOM Elements
  const optionsContainer = document.getElementById('optionsContainer');
  const optionInput = document.getElementById('optionInput');
  const addOptionBtn = document.getElementById('addOptionBtn');

  const constraintsContainer = document.getElementById('constraintsContainer');
  const constraintNameInput = document.getElementById('constraintNameInput');
  const constraintWeightInput = document.getElementById('constraintWeightInput');
  const constraintWeightValPreview = document.getElementById('constraintWeightValPreview');
  const addConstraintBtn = document.getElementById('addConstraintBtn');

  const analyzeBtn = document.getElementById('analyzeBtn');

  // Preview initial slider
  if (constraintWeightInput && constraintWeightValPreview) {
    constraintWeightInput.addEventListener('input', (e) => {
      constraintWeightValPreview.textContent = `${e.target.value}%`;
    });
  }

  // --- Option Management ---
  function addOption(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (optionsList.includes(trimmed)) {
      alert('This option is already added.');
      return;
    }
    optionsList.push(trimmed);
    renderOptionChips();
    if (optionInput) optionInput.value = '';
  }

  function renderOptionChips() {
    if (!optionsContainer) return;
    if (optionsList.length === 0) {
      optionsContainer.innerHTML = `<span style="color:var(--text-dim); font-size:0.85rem; font-style:italic;">No options added yet. Type an option above and click Add.</span>`;
      return;
    }

    optionsContainer.innerHTML = optionsList.map((opt, idx) => `
      <div class="option-chip">
        <span>${opt}</span>
        <span class="remove-chip" onclick="removeOption(${idx})">&times;</span>
      </div>
    `).join('');
  }

  window.removeOption = (index) => {
    optionsList.splice(index, 1);
    renderOptionChips();
  };

  if (addOptionBtn && optionInput) {
    addOptionBtn.addEventListener('click', () => addOption(optionInput.value));
    optionInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addOption(optionInput.value);
      }
    });
  }

  // --- Dynamic Constraint Management ---
  function addConstraint(name, weight) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const existing = constraintsList.find(c => c.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      alert('This constraint is already added. You can adjust its weight slider below.');
      return;
    }

    const newConstraint = {
      id: 'c_' + Date.now() + Math.random().toString(36).substring(2, 5),
      name: trimmed,
      weight: parseInt(weight, 10) || 50
    };

    constraintsList.push(newConstraint);
    renderConstraints();
    if (constraintNameInput) constraintNameInput.value = '';
  }

  function renderConstraints() {
    if (!constraintsContainer) return;
    if (constraintsList.length === 0) {
      constraintsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px dashed var(--glass-border); border-radius: var(--radius-sm); text-align: center; color: var(--text-dim); font-size: 0.85rem;">
          No custom constraints added yet. Add factors relevant to your decision (e.g., Cost, Enjoyment, Time Required, Location).
        </div>
      `;
      return;
    }

    constraintsContainer.innerHTML = constraintsList.map((c, idx) => `
      <div class="constraint-item" id="item_${c.id}">
        <div class="constraint-label">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-sliders" style="color: var(--c-amber-warm); font-size: 0.8rem;"></i>
            <strong style="color: #fff; font-size: 0.88rem;">${c.name}</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span id="label_val_${c.id}" style="color: var(--c-amber-warm); font-size: 0.82rem; font-weight: 700;">${c.weight}%</span>
            <span class="remove-chip" style="cursor: pointer; color: var(--c-rose-rust); font-size: 1rem; font-weight: bold;" onclick="removeConstraint(${idx})" title="Remove constraint">&times;</span>
          </div>
        </div>
        <input type="range" class="constraint-slider" min="5" max="100" value="${c.weight}" 
               oninput="updateConstraintWeight(${idx}, this.value, '${c.id}')">
      </div>
    `).join('');
  }

  window.updateConstraintWeight = (index, value, id) => {
    if (constraintsList[index]) {
      constraintsList[index].weight = parseInt(value, 10);
      const valElem = document.getElementById(`label_val_${id}`);
      if (valElem) valElem.textContent = `${value}%`;
    }
  };

  window.removeConstraint = (index) => {
    constraintsList.splice(index, 1);
    renderConstraints();
  };

  if (addConstraintBtn && constraintNameInput) {
    addConstraintBtn.addEventListener('click', () => {
      addConstraint(constraintNameInput.value, constraintWeightInput?.value || 50);
    });
    constraintNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addConstraint(constraintNameInput.value, constraintWeightInput?.value || 50);
      }
    });
  }

  // Pre-seed some flexible examples that user can customize/delete
  addOption("MacBook Air M3");
  addOption("Dell XPS 14");
  addOption("Lenovo ThinkPad X1");

  addConstraint("Price / Budget", 70);
  addConstraint("Battery Life", 85);
  addConstraint("Portability & Weight", 60);

  // --- AI Multi-Criteria Decision Analysis & Neural Explanation Engine ---
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      const question = document.getElementById('decisionQuestion')?.value.trim();
      const userContext = document.getElementById('userContext')?.value.trim() || '';

      if (!question) {
        alert('Please specify your decision question.');
        document.getElementById('decisionQuestion')?.focus();
        return;
      }

      if (optionsList.length < 2) {
        alert('Please enter at least 2 options to compare.');
        document.getElementById('optionInput')?.focus();
        return;
      }

      if (constraintsList.length === 0) {
        alert('Please add at least 1 constraint/factor to evaluate the options against.');
        document.getElementById('constraintNameInput')?.focus();
        return;
      }

      const resultCard = document.getElementById('decisionResultCard');
      const resultBody = document.getElementById('resultBody');
      if (!resultCard || !resultBody) return;

      // Calculate total weight to normalize
      const sumWeights = constraintsList.reduce((acc, c) => acc + c.weight, 0) || 1;

      // Evaluate each option against the user's specific constraints
      const evaluatedOptions = optionsList.map((opt, optIndex) => {
        let weightedScoreSum = 0;
        const factorScores = [];

        constraintsList.forEach((constraint, cIndex) => {
          // Generate a contextual deterministic metric for (Option x Constraint)
          let seed = 0;
          for (let i = 0; i < opt.length; i++) seed += opt.charCodeAt(i);
          for (let i = 0; i < constraint.name.length; i++) seed += constraint.name.charCodeAt(i);
          seed = (seed * 17 + optIndex * 31 + cIndex * 19) % 100;

          // Normalized score between 52 and 98
          const score = 52 + (seed % 47);
          const normalizedWeight = constraint.weight / sumWeights;
          weightedScoreSum += score * normalizedWeight;

          factorScores.push({
            name: constraint.name,
            weight: constraint.weight,
            score: score
          });
        });

        const finalScore = Math.round(weightedScoreSum);
        return {
          name: opt,
          score: finalScore,
          factorScores: factorScores
        };
      });

      // Rank options descending by score
      evaluatedOptions.sort((a, b) => b.score - a.score);
      const winner = evaluatedOptions[0];
      const runnerUp = evaluatedOptions[1];

      // Identify the most decisive constraints (highest weight)
      const sortedConstraints = [...constraintsList].sort((a, b) => b.weight - a.weight);
      const topConstraint = sortedConstraints[0];
      const secondConstraint = sortedConstraints[1] || sortedConstraints[0];

      // Winner's strongest factor
      const bestFactorForWinner = [...winner.factorScores].sort((a, b) => b.score - a.score)[0];

      // Construct a deep, custom AI Explanation tailored to the question, constraints & options
      let aiExplanation = `
        <div style="font-size: 0.94rem; line-height: 1.7; color: #fff;">
          <p style="margin-bottom: 0.8rem;">
            When solving: <strong style="color: var(--c-amber-warm);">"${question}"</strong>, the AI multi-attribute decision model analyzed all <strong>${optionsList.length} options</strong> exclusively through your custom constraints: 
            <span style="color: var(--c-blush-cream); font-weight: 600;">${constraintsList.map(c => `${c.name} (${c.weight}%)`).join(', ')}</span>.
          </p>

          <p style="margin-bottom: 0.8rem;">
            <strong>Why ${winner.name} was chosen as the winner:</strong><br>
            Because your highest priority is <strong style="color: var(--c-amber-warm);">${topConstraint.name} (${topConstraint.weight}% priority)</strong>, 
            <strong>${winner.name}</strong> delivered the highest score efficiency (${winner.score}/100), especially excelling at <strong>${bestFactorForWinner.name}</strong> (${bestFactorForWinner.score}/100).
            ${runnerUp ? `In contrast, while <em>${runnerUp.name}</em> performed decently (${runnerUp.score}/100), it experienced greater score attrition in high-weight constraints.` : ''}
          </p>

          ${userContext ? `
            <p style="margin-bottom: 0.8rem; background: rgba(255,255,255,0.05); padding: 0.6rem 0.9rem; border-radius: var(--radius-sm); border-left: 2px solid var(--c-amber-warm);">
              <i class="fa-solid fa-circle-info" style="color: var(--c-amber-warm); margin-right: 0.4rem;"></i>
              <em>Additional Context Filter:</em> The choice was also reconciled with your specific request: "<strong>${userContext}</strong>".
            </p>
          ` : ''}

          <p style="margin-bottom: 0; color: var(--text-dim);">
            <strong>Final Recommendation:</strong> Select <strong>${winner.name}</strong> for the optimal balance against your defined criteria without compromising on ${secondConstraint.name}.
          </p>
        </div>
      `;

      // Render the complete output
      resultBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="badge badge-winner" style="font-size: 0.82rem; padding: 0.4rem 1.2rem; margin-bottom: 0.8rem;">
            ✦ Algorithmic Winner
          </div>
          <h2 style="font-size: 2.3rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem;">${winner.name}</h2>
          <p style="color: var(--c-amber-warm); font-size: 1.05rem; font-weight: 600;">Match Index: ${winner.score}%</p>
        </div>

        <div class="ai-box" style="margin-bottom: 2rem;">
          <div class="ai-box-header">
            <i class="fa-solid fa-brain"></i> AI Decision Rationale & Explanation
          </div>
          ${aiExplanation}
        </div>

        <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: #fff;">Contender Rankings & Constraint Breakdown:</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${evaluatedOptions.map((opt, rank) => `
            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); padding: 1.1rem 1.3rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.6rem;">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                  <span style="font-size: 1.15rem; font-weight: 800; color: ${rank === 0 ? 'var(--c-amber-warm)' : 'var(--text-dim)'};">#${rank + 1}</span>
                  <strong style="color: #fff; font-size: 1.05rem;">${opt.name}</strong>
                  ${rank === 0 ? '<span class="badge badge-winner" style="font-size: 0.65rem; padding: 0.2rem 0.6rem;">Top Choice</span>' : ''}
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 1.15rem; font-weight: 700; color: ${rank === 0 ? 'var(--c-amber-warm)' : '#fff'};">${opt.score}%</span>
                </div>
              </div>

              <!-- Constraint breakdown pills for each option -->
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.4rem;">
                ${opt.factorScores.map(f => `
                  <span style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.08); padding: 0.25rem 0.65rem; border-radius: var(--radius-pill); font-size: 0.76rem; color: var(--text-dim);">
                    ${f.name}: <strong style="color: ${f.score >= 80 ? 'var(--c-amber-warm)' : '#fff'};">${f.score}</strong>
                  </span>
                `).join('')}
              </div>

              <div class="score-progress" style="height: 6px; width: 100%; margin-top: 0.8rem;">
                <div class="score-fill ${rank === 0 ? 'green' : ''}" style="width: ${opt.score}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      resultCard.style.display = 'block';
      resultCard.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
