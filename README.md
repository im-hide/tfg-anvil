# TerraFirmaCraft Forging Calculator

A web-based calculator for perfectly forging items in TerraFirmaCraft. This Angular 20 application helps players determine the optimal sequence of operations to hit their target forging value.

![Angular](https://img.shields.io/badge/Angular-20-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

-  **Smart Algorithm**: Uses BFS (Breadth-First Search) to find the minimum number of operations required
-  **Color-Coded Operations**: Visual representation matching in-game colors
-  **Step-by-Step Breakdown**: Shows required operations, final operations, and complete sequence
-  **Real-time Calculation**: Instant results as you input values

## How It Works

### Workflow

1. **Enter Target Value**: Input the target value shown in the TerraFirmaCraft in-game UI
2. **Select Final Operations**: Choose 1-3 operations from the top of the in-game UI (left to right)
3. **Calculate**: The app computes:
   - The inverse sum of your final operations
   - A new target value to account for the final operations
   - The minimum number of operations needed to reach that new target
4. **Execute**: Follow the displayed sequence in order

## Installation & Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tfc-forging-calculator.git
cd tfc-forging-calculator

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:4200/`

### Build for Production

```bash
npm run build
```

Production files will be in `dist/angular-app/`

## Project Structure

```
angular-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Main component logic
│   │   ├── app.component.html     # UI template
│   │   ├── app.component.css      # Component styles
│   │   ├── app.module.ts          # Angular module definition
│   │   └── forging.service.ts     # BFS algorithm & calculation logic
│   ├── index.html                 # Entry HTML
│   ├── main.ts                    # Bootstrap file
│   └── styles.css                 # Global styles
├── angular.json                   # Angular CLI configuration
├── package.json                   # Dependencies
└── tsconfig.json                  # TypeScript configuration
```

## Algorithm Details

The calculator uses a **Breadth-First Search (BFS)** algorithm to find the shortest path (minimum operations) to reach the target value. This guarantees an optimal solution.

### Why BFS?

- Explores all possible operation combinations level by level
- Finds the shortest path (minimum operations)
- More reliable than greedy approaches for this problem

### Fallback

If BFS doesn't find a solution within reasonable bounds (50 steps), it falls back to a greedy algorithm.

## Technologies

- **Angular 20**: Modern web framework
- **TypeScript 5.8**: Type-safe JavaScript
- **RxJS**: Reactive programming
- **CSS3**: Gradient backgrounds and modern styling

## Example Usage

**Target**: 46  
**Final Operations**: Lime (+2), Red (+16)

**Calculation**:
- Inversed Sum: -18
- New Target: 28
- Required Operations: Orange (+13), Orange (+13), Lime (+2)
- Complete Sequence: Lime, Orange, Orange, Red, Lime

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for your TerraFirmaCraft adventures!

## Acknowledgments

- Built for the TerraFirmaCraft Minecraft mod community
- Algorithm inspired by shortest-path graph traversal techniques

## Author

Created with ❤️ for TerraFirmaCraft players

---

**Note**: This tool is for TerraFirmaCraft game mechanics. Verify results in-game as mod versions may vary.
