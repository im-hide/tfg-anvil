import { Injectable } from '@angular/core';

export interface Operation {
  name: string;
  color: string;
  value: number;
}

export interface CalculationResult {
  originalTarget: number;
  finalOperations: Operation[];
  inversedSum: number;
  newTarget: number;
  requiredOperations: Operation[];
  totalOperations: Operation[];
}

@Injectable({
  providedIn: 'root'
})
export class ForgingService {
  
  // Define all 8 available operations
  readonly operations: Operation[] = [
    { name: 'Cyan', color: '#00FFFF', value: -3 },
    { name: 'Light Blue', color: '#ADD8E6', value: -6 },
  { name: 'Lime', color: '#00FF00', value: 2 },
  { name: 'Yellow', color: '#FFFF00', value: 7 },
  { name: 'Blue', color: '#0000FF', value: -9 },
  { name: 'Purple', color: '#800080', value: -15 },
    { name: 'Orange', color: '#FFA500', value: 13 },
    { name: 'Red', color: '#FF0000', value: 16 }
  ];

  constructor() { }

  /**
   * Find the minimum number of operations to reach the target value using dynamic programming
   */
  findMinimumOperations(target: number): Operation[] {
    if (target === 0) {
      return [];
    }

    // Dynamic programming approach to find minimum operations
    // We'll use BFS to find the shortest path to the target
    const maxSteps = 50; // Reasonable limit for forging
    const visited = new Map<number, { value: number; op: Operation; prev: number | null }>();
    const queue: Array<{ current: number; steps: number }> = [{ current: 0, steps: 0 }];
    visited.set(0, { value: 0, op: this.operations[0], prev: null });

    while (queue.length > 0) {
      const { current, steps } = queue.shift()!;

      // Found the target!
      if (current === target) {
        // Reconstruct the path
        const result: Operation[] = [];
        let node = target;
        
        while (node !== 0) {
          const info = visited.get(node);
          if (!info || info.prev === null) break;
          result.unshift(info.op);
          node = info.prev;
        }
        
        return result;
      }

      // Don't explore further if we've reached max steps
      if (steps >= maxSteps) continue;

      // Try all operations
      for (const op of this.operations) {
        const next = current + op.value;
        
        // Skip if we've already visited this value with fewer or equal steps
        if (visited.has(next)) continue;
        
        // Skip if we're going too far from target (optimization)
        // Allow a reasonable range around the target
        if (Math.abs(next) > Math.abs(target) + 50) continue;
        
        visited.set(next, { value: next, op, prev: current });
        queue.push({ current: next, steps: steps + 1 });
      }
    }

    // Fallback: if BFS didn't find a solution, use greedy approach
    console.warn('BFS did not find optimal solution, falling back to greedy');
    return this.findMinimumOperationsGreedy(target);
  }

  /**
   * Greedy fallback algorithm
   */
  private findMinimumOperationsGreedy(target: number): Operation[] {
    const result: Operation[] = [];
    let remaining = target;

    while (remaining !== 0 && result.length < 100) {
      let bestOp: Operation | null = null;
      let bestRemainder = Math.abs(remaining);

      for (const op of this.operations) {
        const newRemaining = remaining - op.value;
        const newRemainder = Math.abs(newRemaining);

        if (newRemainder < bestRemainder) {
          bestOp = op;
          bestRemainder = newRemainder;
        }
      }

      if (bestOp) {
        result.push(bestOp);
        remaining -= bestOp.value;
      } else {
        break;
      }
    }

    return result;
  }

  /**
   * Calculate the complete forging sequence
   */
  calculate(targetValue: number, finalOps: Operation[]): CalculationResult {
    // Inverse the final operations (they are applied right-to-left in-game)
    const reversedFinalOps = [...finalOps].reverse();
    
    // Calculate the sum of inversed operations
    const inversedSum = reversedFinalOps.reduce((sum, op) => sum - op.value, 0);
    
    // Calculate the new target value
    const newTarget = targetValue + inversedSum;
    
    // Find minimum operations to reach the new target
    const requiredOperations = this.findMinimumOperations(newTarget);
    
    // Combine required operations with final operations
    const totalOperations = [...requiredOperations, ...finalOps];
    
    return {
      originalTarget: targetValue,
      finalOperations: finalOps,
      inversedSum,
      newTarget,
      requiredOperations,
      totalOperations
    };
  }

  /**
   * Get operation by name
   */
  getOperationByName(name: string): Operation | undefined {
    return this.operations.find(op => op.name === name);
  }
}
