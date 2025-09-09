// Markov Chain Visualization - Interactive Probability Simulation

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('markov-canvas');
  const ctx = canvas.getContext('2d');
  const startStateSelect = document.getElementById('start-state');
  const stepsInput = document.getElementById('steps');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const currentStateDiv = document.getElementById('current-state');
  const stateDistributionDiv = document.getElementById('state-distribution');

  // Transition probability inputs
  const pAA = document.getElementById('p-aa');
  const pAB = document.getElementById('p-ab');
  const pAC = document.getElementById('p-ac');
  const pBA = document.getElementById('p-ba');
  const pBB = document.getElementById('p-bb');
  const pBC = document.getElementById('p-bc');
  const pCA = document.getElementById('p-ca');
  const pCB = document.getElementById('p-cb');
  const pCC = document.getElementById('p-cc');

  // --- Retina/HiDPI Canvas Setup ---
  function setupHiDPICanvas(canvas, context, width, height) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
  }

  // Set up canvas for crisp drawing
  const baseWidth = 800;
  const baseHeight = 400;
  setupHiDPICanvas(canvas, ctx, baseWidth, baseHeight);

  let animationId = null;
  let isAnimating = false;
  let simulationData = [];
  let currentStep = 0;

  // Markov Chain class
  class MarkovChain {
    constructor(transitionMatrix) {
      this.transitionMatrix = transitionMatrix;
      this.states = ['A', 'B', 'C'];
    }

    // Get next state based on current state and transition probabilities
    getNextState(currentState) {
      const stateIndex = this.states.indexOf(currentState);
      const probabilities = this.transitionMatrix[stateIndex];
      
      const random = Math.random();
      let cumulativeProbability = 0;
      
      for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (random <= cumulativeProbability) {
          return this.states[i];
        }
      }
      
      return this.states[this.states.length - 1]; // Fallback
    }

    // Run simulation for given number of steps
    runSimulation(startState, steps) {
      const sequence = [startState];
      let currentState = startState;
      
      for (let i = 1; i < steps; i++) {
        currentState = this.getNextState(currentState);
        sequence.push(currentState);
      }
      
      return sequence;
    }
  }

  // Get transition matrix from input values
  function getTransitionMatrix() {
    return [
      [parseFloat(pAA.value), parseFloat(pAB.value), parseFloat(pAC.value)],
      [parseFloat(pBA.value), parseFloat(pBB.value), parseFloat(pBC.value)],
      [parseFloat(pCA.value), parseFloat(pCB.value), parseFloat(pCC.value)]
    ];
  }

  // Validate transition matrix (probabilities must sum to 1 for each row)
  function validateTransitionMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      const rowSum = matrix[i].reduce((sum, prob) => sum + prob, 0);
      if (Math.abs(rowSum - 1) > 0.01) {
        return false;
      }
    }
    return true;
  }

  // Clear canvas
  function clearCanvas() {
    ctx.clearRect(0, 0, baseWidth, baseHeight);
  }

  // Draw state transition diagram
  function drawStateDiagram() {
    const margin = 50;
    const centerX = baseWidth / 2;
    const centerY = baseHeight / 2;
    const radius = 80;
    
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw state circles
    const statePositions = [
      { x: centerX - radius * 1.5, y: centerY - radius * 0.8, state: 'A' },
      { x: centerX + radius * 1.5, y: centerY - radius * 0.8, state: 'B' },
      { x: centerX, y: centerY + radius * 1.2, state: 'C' }
    ];

    // Draw state circles
    statePositions.forEach(pos => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#ffffff';
      ctx.fillText(pos.state, pos.x, pos.y);
      ctx.fillStyle = '#1f2937';
    });

    // Draw transition arrows with probabilities
    const matrix = getTransitionMatrix();
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 1.5;
    ctx.font = '12px Inter, Arial, sans-serif';
    ctx.fillStyle = '#667eea';

    // Self-loops
    statePositions.forEach((pos, i) => {
      const prob = matrix[i][i];
      if (prob > 0) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 20, -Math.PI/4, Math.PI/4);
        ctx.stroke();
        ctx.fillText(prob.toFixed(2), pos.x + radius/2, pos.y - radius/2);
      }
    });

    // Transitions between different states
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i !== j && matrix[i][j] > 0) {
          const start = statePositions[i];
          const end = statePositions[j];
          
          // Calculate arrow position
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const unitX = dx / distance;
          const unitY = dy / distance;
          
          const arrowStartX = start.x + unitX * radius;
          const arrowStartY = start.y + unitY * radius;
          const arrowEndX = end.x - unitX * radius;
          const arrowEndY = end.y - unitY * radius;
          
          // Draw arrow
          ctx.beginPath();
          ctx.moveTo(arrowStartX, arrowStartY);
          ctx.lineTo(arrowEndX, arrowEndY);
          ctx.stroke();
          
          // Draw probability label
          const midX = (arrowStartX + arrowEndX) / 2;
          const midY = (arrowStartY + arrowEndY) / 2;
          ctx.fillText(matrix[i][j].toFixed(2), midX, midY);
        }
      }
    }

    ctx.restore();
  }

  // Draw simulation results
  function drawSimulationResults() {
    if (simulationData.length === 0) return;

    const margin = 50;
    const chartWidth = baseWidth - 2 * margin;
    const chartHeight = baseHeight - 2 * margin;

    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.font = '12px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, margin + chartHeight);
    ctx.moveTo(margin, margin + chartHeight);
    ctx.lineTo(margin + chartWidth, margin + chartHeight);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Steps', margin + chartWidth/2, margin + chartHeight + 25);
    ctx.save();
    ctx.translate(margin - 25, margin + chartHeight/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText('State', 0, 0);
    ctx.restore();

    // Draw state transitions
    const stepWidth = chartWidth / (simulationData.length - 1);
    const stateColors = { 'A': '#ff6b6b', 'B': '#4ecdc4', 'C': '#45b7d1' };
    
    ctx.lineWidth = 2;
    
    for (let i = 0; i < simulationData.length - 1; i++) {
      const currentState = simulationData[i];
      const nextState = simulationData[i + 1];
      
      const x1 = margin + i * stepWidth;
      const y1 = margin + (2 - simulationData.indexOf(currentState)) * (chartHeight / 2);
      const x2 = margin + (i + 1) * stepWidth;
      const y2 = margin + (2 - simulationData.indexOf(nextState)) * (chartHeight / 2);
      
      ctx.strokeStyle = stateColors[currentState];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // Draw state points
      ctx.fillStyle = stateColors[currentState];
      ctx.beginPath();
      ctx.arc(x1, y1, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Draw last point
    const lastState = simulationData[simulationData.length - 1];
    const lastX = margin + (simulationData.length - 1) * stepWidth;
    const lastY = margin + (2 - simulationData.indexOf(lastState)) * (chartHeight / 2);
    ctx.fillStyle = stateColors[lastState];
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Draw state labels
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Inter, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('State A', margin - 10, margin);
    ctx.fillText('State B', margin - 10, margin + chartHeight/2);
    ctx.fillText('State C', margin - 10, margin + chartHeight);

    ctx.restore();
  }

  // Update info panels
  function updateInfoPanels() {
    if (simulationData.length === 0) {
      currentStateDiv.textContent = 'Click "Run Simulation" to start';
      stateDistributionDiv.textContent = 'Waiting for simulation...';
      return;
    }

    const currentState = simulationData[currentStep];
    currentStateDiv.textContent = `Current State: ${currentState}`;

    // Calculate state distribution
    const stateCounts = { 'A': 0, 'B': 0, 'C': 0 };
    for (let i = 0; i <= currentStep; i++) {
      stateCounts[simulationData[i]]++;
    }
    
    const total = currentStep + 1;
    const distribution = Object.entries(stateCounts)
      .map(([state, count]) => `${state}: ${((count/total)*100).toFixed(1)}%`)
      .join(', ');
    
    stateDistributionDiv.textContent = `Distribution: ${distribution}`;
  }

  // Run simulation step by step
  function runSimulationStep() {
    if (currentStep >= simulationData.length - 1) {
      isAnimating = false;
      return;
    }

    currentStep++;
    updateInfoPanels();
    
    // Redraw with current step highlighted
    clearCanvas();
    drawStateDiagram();
    drawSimulationResults();
    
    if (isAnimating) {
      animationId = requestAnimationFrame(runSimulationStep);
    }
  }

  // Start simulation
  function startSimulation() {
    if (isAnimating) return;

    const matrix = getTransitionMatrix();
    if (!validateTransitionMatrix(matrix)) {
      alert('Invalid transition matrix! Each row must sum to 1.0');
      return;
    }

    const startState = startStateSelect.value;
    const steps = parseInt(stepsInput.value);
    
    if (steps < 10 || steps > 1000) {
      alert('Please enter a number of steps between 10 and 1000');
      return;
    }

    // Create and run Markov Chain
    const markovChain = new MarkovChain(matrix);
    simulationData = markovChain.runSimulation(startState, steps);
    currentStep = 0;

    // Start animation
    isAnimating = true;
    updateInfoPanels();
    
    clearCanvas();
    drawStateDiagram();
    drawSimulationResults();
    
    // Run step by step
    animationId = requestAnimationFrame(runSimulationStep);
  }

  // Reset simulation
  function resetSimulation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    isAnimating = false;
    simulationData = [];
    currentStep = 0;
    
    clearCanvas();
    drawStateDiagram();
    updateInfoPanels();
  }

  // Event listeners
  startBtn.addEventListener('click', startSimulation);
  resetBtn.addEventListener('click', resetSimulation);

  // Initialize
  clearCanvas();
  drawStateDiagram();
  updateInfoPanels();

  // Handle window resize
  window.addEventListener('resize', () => {
    setupHiDPICanvas(canvas, ctx, baseWidth, baseHeight);
    clearCanvas();
    drawStateDiagram();
    if (simulationData.length > 0) {
      drawSimulationResults();
    }
  });
}); 