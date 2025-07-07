// Dynamic Collision Simulation - 1D X-axis only
// High precision physics with energy conservation validation

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('collisionCanvas');
    const ctx = canvas.getContext('2d');
    
    // HiDPI Canvas Setup
    function setupHiDPICanvas(canvas, context, width, height) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);
    }
    
    const baseWidth = 800;
    const baseHeight = 400;
    setupHiDPICanvas(canvas, ctx, baseWidth, baseHeight);
    
    // Game state
    let isRunning = false;
    let animationId = null;
    let collisionCount = 0; // Counter for block1 collisions
    let lastTime = 0;
    let energyHistory = []; // Track energy for validation
    
    // Physics constants - using high precision
    const wallWidth = 20;
    const floorHeight = 20;
    const friction = 1.0; // Frictionless floor
    const restitution = 1.0; // Perfect elastic collisions - no energy loss
    const EPSILON = 1e-10; // Small number for floating point comparisons
    const MIN_VELOCITY = 1e-6; // Minimum velocity threshold
    
    // High precision math functions
    function isZero(value) {
        return Math.abs(value) < EPSILON;
    }
    
    function isEqual(a, b) {
        return Math.abs(a - b) < EPSILON;
    }
    
    function roundToPrecision(value, precision = 6) {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }
    
    // Blocks with high precision properties
    let block1 = {
        x: 150,
        y: baseHeight - floorHeight - 50,
        width: 50,
        height: 50,
        vx: 2,
        mass: 1,
        color: '#ff6b6b'
    };
    
    let block2 = {
        x: 650,
        y: baseHeight - floorHeight - 50,
        width: 50,
        height: 50,
        vx: -2,
        mass: 10,
        color: '#4ecdc4'
    };
    
    // Input elements
    const mass1Input = document.getElementById('mass1');
    const mass2Input = document.getElementById('mass2');
    const velocity1Input = document.getElementById('velocity1');
    const velocity2Input = document.getElementById('velocity2');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    function updateBlockFromInputs() {
        block1.mass = parseFloat(mass1Input.value);
        block2.mass = parseFloat(mass2Input.value);
        block1.vx = parseFloat(velocity1Input.value);
        block2.vx = parseFloat(velocity2Input.value);
    }
    
    function calculateKineticEnergy() {
        const ke1 = 0.5 * block1.mass * block1.vx * block1.vx;
        const ke2 = 0.5 * block2.mass * block2.vx * block2.vx;
        return ke1 + ke2;
    }
    
    function calculateMomentum() {
        return block1.mass * block1.vx + block2.mass * block2.vx;
    }
    
    function checkCollision(blockA, blockB) {
        // More precise collision detection
        const leftA = blockA.x;
        const rightA = blockA.x + blockA.width;
        const leftB = blockB.x;
        const rightB = blockB.x + blockB.width;
        
        return leftA < rightB && rightA > leftB;
    }
    
    function resolveCollision(blockA, blockB) {
        // Store initial state for validation
        const initialKE = calculateKineticEnergy();
        const initialMomentum = calculateMomentum();
        
        // 1D elastic collision with high precision
        const relativeVelocity = blockB.vx - blockA.vx;
        
        // Don't resolve if objects are moving apart
        if (relativeVelocity > EPSILON) return;
        
        // Calculate new velocities using conservation of momentum and energy
        const totalMass = blockA.mass + block2.mass;
        
        // Use more precise calculation to avoid floating point errors
        const newVx1 = ((blockA.mass - blockB.mass) * blockA.vx + 2 * blockB.mass * blockB.vx) / totalMass;
        const newVx2 = ((blockB.mass - blockA.mass) * blockB.vx + 2 * blockA.mass * blockA.vx) / totalMass;
        
        // Apply velocities without rounding to maintain full precision
        blockA.vx = newVx1;
        blockB.vx = newVx2;
        
        // Separate blocks to prevent sticking with high precision
        const overlap = (blockA.width + blockB.width) / 2 - Math.abs(blockB.x - blockA.x);
        if (overlap > EPSILON) {
            const separation = overlap / 2;
            if (blockA.x < blockB.x) {
                blockA.x = blockA.x - separation;
                blockB.x = blockB.x + separation;
            } else {
                blockA.x = blockA.x + separation;
                blockB.x = blockB.x - separation;
            }
        }
        
        // Validate energy and momentum conservation
        const finalKE = calculateKineticEnergy();
        const finalMomentum = calculateMomentum();
        
        const keError = Math.abs(finalKE - initialKE);
        const momentumError = Math.abs(finalMomentum - initialMomentum);
        
        // Log significant errors (for debugging)
        if (keError > 1e-6 || momentumError > 1e-6) {
            console.warn('Energy/Momentum conservation error:', {
                keError: keError,
                momentumError: momentumError,
                initialKE: initialKE,
                finalKE: finalKE,
                initialMomentum: initialMomentum,
                finalMomentum: finalMomentum
            });
        }
    }
    
    function update(deltaTime) {
        if (!isRunning) return;
        
        // Apply friction with high precision
        block1.vx = block1.vx * friction;
        block2.vx = block2.vx * friction;
        
        // Update positions with high precision
        block1.x = block1.x + block1.vx;
        block2.x = block2.x + block2.vx;
        
        // Wall collision (left wall only) with high precision
        if (block1.x <= wallWidth) {
            block1.x = wallWidth;
            block1.vx = -block1.vx * restitution;
            collisionCount++;
        }
        if (block2.x <= wallWidth) {
            block2.x = wallWidth;
            block2.vx = -block2.vx * restitution;
        }
        
        // Check collision between blocks
        if (checkCollision(block1, block2)) {
            resolveCollision(block1, block2);
            collisionCount++;
        }
        
        // Track energy for validation
        const currentEnergy = calculateKineticEnergy();
        energyHistory.push(currentEnergy);
        if (energyHistory.length > 100) {
            energyHistory.shift(); // Keep only last 100 values
        }
    }
    
    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, baseWidth, baseHeight);
        
        // Draw background grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x < baseWidth; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, baseHeight);
            ctx.stroke();
        }
        for (let y = 0; y < baseHeight; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(baseWidth, y);
            ctx.stroke();
        }
        
        // Draw left wall
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, wallWidth, baseHeight);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, wallWidth, baseHeight);
        
        // Draw floor
        ctx.fillStyle = '#696969';
        ctx.fillRect(0, baseHeight - floorHeight, baseWidth, floorHeight);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, baseHeight - floorHeight, baseWidth, floorHeight);
        
        // Draw collision counter and energy info
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Block 1 Collisions: ${collisionCount}`, 30, 30);
        
        // Display current energy and momentum
        const currentEnergy = calculateKineticEnergy();
        const currentMomentum = calculateMomentum();
        ctx.font = '14px Inter, Arial, sans-serif';
        ctx.fillText(`Energy: ${currentEnergy.toFixed(6)} J`, 30, 55);
        ctx.fillText(`Momentum: ${currentMomentum.toFixed(6)} kg⋅m/s`, 30, 75);
        
        // Draw blocks
        function drawBlock(block) {
            ctx.fillStyle = block.color;
            ctx.fillRect(block.x, block.y, block.width, block.height);
            
            // Add border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(block.x, block.y, block.width, block.height);
            
            // Add mass label
            ctx.fillStyle = 'white';
            ctx.font = '14px Inter, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`M: ${block.mass}`, block.x + block.width/2, block.y + block.height/2 + 5);
            
            // Add velocity vector (horizontal only) with high precision display
            const centerX = block.x + block.width/2;
            const centerY = block.y + block.height/2;
            const vectorLength = Math.abs(block.vx) * 15;
            
            if (Math.abs(block.vx) > MIN_VELOCITY) {
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                
                // Draw arrow in the direction of velocity
                if (block.vx > 0) {
                    // Positive velocity - arrow points right
                    ctx.lineTo(centerX + vectorLength, centerY);
                    ctx.stroke();
                    
                    // Arrow head pointing right
                    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
                    ctx.beginPath();
                    ctx.moveTo(centerX + vectorLength, centerY);
                    ctx.lineTo(centerX + vectorLength - 8, centerY - 4);
                    ctx.lineTo(centerX + vectorLength - 8, centerY + 4);
                    ctx.fill();
                } else {
                    // Negative velocity - arrow points left
                    ctx.lineTo(centerX - vectorLength, centerY);
                    ctx.stroke();
                    
                    // Arrow head pointing left
                    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
                    ctx.beginPath();
                    ctx.moveTo(centerX - vectorLength, centerY);
                    ctx.lineTo(centerX - vectorLength + 8, centerY - 4);
                    ctx.lineTo(centerX - vectorLength + 8, centerY + 4);
                    ctx.fill();
                }
                
                // Display velocity value above the block
                ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
                ctx.font = '12px Inter, Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`${block.vx.toFixed(6)}`, centerX, block.y - 10);
            }
        }
        
        drawBlock(block1);
        drawBlock(block2);
    }
    
    function gameLoop(currentTime) {
        if (!isRunning) return;
        
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        update(deltaTime);
        draw();
        
        if (isRunning) {
            animationId = requestAnimationFrame(gameLoop);
        }
    }
    
    function startSimulation() {
        if (isRunning) return;
        
        updateBlockFromInputs();
        isRunning = true;
        lastTime = performance.now();
        startBtn.textContent = 'Pause';
        gameLoop(lastTime);
    }
    
    function stopSimulation() {
        isRunning = false;
        startBtn.textContent = 'Start Simulation';
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    
    function resetSimulation() {
        stopSimulation();
        
        // Reset collision counter and energy history
        collisionCount = 0;
        energyHistory = [];
        
        // Reset block positions with high precision
        block1.x = 150;
        block1.y = baseHeight - floorHeight - 50;
        block2.x = 650;
        block2.y = baseHeight - floorHeight - 50;
        
        // Reset velocities
        block1.vx = 0;
        block2.vx = 0;
        
        // Reset inputs to defaults
        mass1Input.value = 1;
        mass2Input.value = 1;
        velocity1Input.value = 0;
        velocity2Input.value = -5;
        
        updateBlockFromInputs();
        draw();
    }
    
    // Event listeners
    startBtn.addEventListener('click', () => {
        if (isRunning) {
            stopSimulation();
        } else {
            startSimulation();
        }
    });
    
    resetBtn.addEventListener('click', resetSimulation);
    
    // Update simulation when inputs change
    [mass1Input, mass2Input, velocity1Input, velocity2Input].forEach(input => {
        input.addEventListener('change', () => {
            if (!isRunning) {
                updateBlockFromInputs();
                draw();
            }
        });
    });
    
    // Initialize
    updateBlockFromInputs();
    draw();
}); 