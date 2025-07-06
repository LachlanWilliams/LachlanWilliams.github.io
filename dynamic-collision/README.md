# Dynamic Collision Simulation

This project demonstrates realistic physics-based collision between two blocks using conservation of momentum and energy principles.

## Features

- **Interactive Controls**: Adjust mass and velocity of both blocks in real-time
- **Realistic Physics**: Uses elastic collision equations with conservation of momentum
- **Visual Feedback**: 
  - Block size changes based on mass
  - Velocity vectors show direction and magnitude
  - Mass labels on each block
  - Background grid for reference
- **Smooth Animation**: 60fps physics simulation with HiDPI canvas support
- **Wall Collisions**: Blocks bounce off canvas boundaries with energy loss

## How It Works

The simulation uses elastic collision physics:

1. **Collision Detection**: AABB (Axis-Aligned Bounding Box) collision detection
2. **Momentum Conservation**: Total momentum is preserved during collisions
3. **Energy Conservation**: Kinetic energy is conserved in elastic collisions
4. **Impulse Calculation**: Uses the impulse-momentum theorem to calculate new velocities

## Physics Equations

For elastic collisions between two objects:
- **Conservation of Momentum**: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'
- **Conservation of Energy**: ½m₁v₁² + ½m₂v₂² = ½m₁v₁'² + ½m₂v₂'²

The final velocities are calculated using:
- v₁' = v₁ + (2m₂(v₂ - v₁)) / (m₁ + m₂)
- v₂' = v₂ + (2m₁(v₁ - v₂)) / (m₁ + m₂)

## Usage

1. Set the masses and initial velocities using the input controls
2. Click "Start Simulation" to begin the physics simulation
3. Watch the blocks collide and observe how mass affects the collision outcome
4. Use "Reset" to return to the initial state
5. Try different combinations to see how physics principles work in action

## Technical Details

- Built with vanilla JavaScript and HTML5 Canvas
- Uses requestAnimationFrame for smooth 60fps animation
- HiDPI/Retina display support for crisp graphics
- Responsive design that works on mobile and desktop 