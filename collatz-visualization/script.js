// Collatz Conjecture Visualization - Animated, Modern Visuals

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('collatz-canvas');
  const ctx = canvas.getContext('2d');
  const startInput = document.getElementById('start-number');
  const startBtn = document.getElementById('start-btn');
  const sequenceDiv = document.getElementById('sequence');

  // --- Retina/HiDPI Canvas Setup ---
  function setupHiDPICanvas(canvas, context, width, height) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.setTransform(1, 0, 0, 1, 0, 0); // Reset any existing transforms
    context.scale(dpr, dpr);
  }

  // Set up canvas for crisp drawing
  const baseWidth = 800;
  const baseHeight = 400;
  setupHiDPICanvas(canvas, ctx, baseWidth, baseHeight);

  let animationId = null;
  let isAnimating = false;

  function collatzSequence(n) {
    const seq = [n];
    while (n !== 1) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      seq.push(n);
    }
    return seq;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, baseWidth, baseHeight);
  }

  function drawAxes(margin, w, h, seq) {
    ctx.save();
    ctx.strokeStyle = '#44475a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(margin, margin + h);
    ctx.lineTo(margin + w, margin + h); // x-axis
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, margin + h); // y-axis
    ctx.stroke();

    // Draw x-axis ticks and labels (steps)
    const steps = seq.length - 1;
    const xTickCount = Math.min(10, steps);
    const xStep = Math.max(1, Math.floor(steps / xTickCount));
    ctx.fillStyle = '#ccc';
    ctx.font = '13px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i <= steps; i += xStep) {
      const x = margin + (i / steps) * w;
      ctx.beginPath();
      ctx.moveTo(x, margin + h);
      ctx.lineTo(x, margin + h + 8);
      ctx.stroke();
      ctx.fillText(i, x, margin + h + 10);
    }
    // Last label
    if (steps % xStep !== 0) {
      const x = margin + w;
      ctx.beginPath();
      ctx.moveTo(x, margin + h);
      ctx.lineTo(x, margin + h + 8);
      ctx.stroke();
      ctx.fillText(steps, x, margin + h + 10);
    }

    // Draw y-axis ticks and labels (values)
    const maxVal = Math.max(...seq);
    const minVal = Math.min(...seq);
    const yTickCount = 8;
    for (let i = 0; i <= yTickCount; i++) {
      const value = Math.round(maxVal - (i / yTickCount) * (maxVal - minVal));
      const y = margin + ((i / yTickCount) * h);
      ctx.beginPath();
      ctx.moveTo(margin - 8, y);
      ctx.lineTo(margin, y);
      ctx.stroke();
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(value, margin - 12, y);
    }
    ctx.restore();
  }

  function animateSequence(seq, pace = 20) {
    clearCanvas();
    if (seq.length < 2) return;
    const margin = 60;
    const w = baseWidth - 2 * margin;
    const h = baseHeight - 2 * margin;
    const maxVal = Math.max(...seq);
    const minVal = Math.min(...seq);
    let i = 1;

    drawAxes(margin, w, h, seq);

    function drawStep() {
      clearCanvas();
      drawAxes(margin, w, h, seq);
      ctx.save();
      ctx.translate(margin, margin);
      ctx.strokeStyle = '#ff5555'; // Red line
      ctx.lineWidth = 3;
      ctx.beginPath();
      let prevX = 0;
      let prevY = h - ((seq[0] - minVal) / (maxVal - minVal)) * h;
      ctx.moveTo(prevX, prevY);
      for (let j = 1; j <= i; j++) {
        const x = (j / (seq.length - 1)) * w;
        const y = h - ((seq[j] - minVal) / (maxVal - minVal)) * h;
        ctx.lineTo(x, y);
        prevX = x;
        prevY = y;
      }
      ctx.stroke();
      ctx.restore();
      if (i < seq.length - 1) {
        i++;
        animationId = setTimeout(drawStep, pace);
      } else {
        isAnimating = false;
        startBtn.disabled = false;
        startInput.disabled = false;
      }
    }
    drawStep();
  }

  function showSequence(seq) {
    sequenceDiv.textContent = `Sequence (${seq.length} steps): ` + seq.join(', ');
  }

  function visualize() {
    let n = parseInt(startInput.value, 10);
    if (isNaN(n) || n < 1) {
      alert('Please enter a positive integer.');
      return;
    }
    if (isAnimating) {
      clearTimeout(animationId);
      isAnimating = false;
    }
    startBtn.disabled = true;
    startInput.disabled = true;
    const seq = collatzSequence(n);
    showSequence(seq);
    isAnimating = true;
    animateSequence(seq, 20); // 20ms per step for medium-fast pace
  }

  startBtn.addEventListener('click', visualize);
  startInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') visualize();
  });

  // Initial visualization
  visualize();
}); 