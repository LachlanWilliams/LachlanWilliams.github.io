# Markov Chain Visualization

This project is an interactive visual demonstration of Markov Chains. Explore how probability-based state transitions work and watch the system evolve over time through an animated simulation.

## Features
- Interactive transition matrix input (3x3 states)
- Real-time state transition diagram visualization
- Step-by-step simulation animation
- State distribution tracking
- Responsive and modern UI
- Validation of probability constraints

## Usage
1. Open `index.html` in your browser
2. Adjust the transition probabilities in the matrix (each row must sum to 1.0)
3. Select a starting state (A, B, or C)
4. Choose the number of simulation steps
5. Click "Run Simulation" to start the animation
6. Use "Reset" to clear and start over

## What is a Markov Chain?
A Markov Chain is a stochastic model that describes a sequence of possible events where the probability of each event depends only on the state attained in the previous event. This "memoryless" property makes Markov Chains powerful tools for modeling systems in:

- **Physics**: Particle movement, quantum systems
- **Biology**: Population dynamics, genetic sequences
- **Economics**: Market states, consumer behavior
- **Computer Science**: PageRank algorithms, text generation
- **Finance**: Credit ratings, stock price movements

## How It Works
1. **Transition Matrix**: Defines the probability of moving from one state to another
2. **State Evolution**: The system transitions between states based on these probabilities
3. **Simulation**: Runs the chain for multiple steps to show long-term behavior
4. **Visualization**: Displays both the transition diagram and the simulation results

## Technical Details
- Built with vanilla JavaScript and HTML5 Canvas
- Responsive design with HiDPI support
- Real-time probability validation
- Smooth animations using requestAnimationFrame
- Modular code structure for easy extension

## Examples
Try these interesting configurations:
- **Absorbing States**: Set P(A→A) = 1.0 to make state A absorbing
- **Cyclic Behavior**: Create cycles like A→B→C→A
- **Random Walk**: Equal probabilities for all transitions
- **Stable States**: High self-transition probabilities 