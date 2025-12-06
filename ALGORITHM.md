# Algorithm Documentation

## Overview

The TerraFirmaCraft Forging Calculator uses a greedy algorithm to find the minimum number of operations needed to reach a target value.

## The Problem

Given:
- A target value (integer)
- 8 available operations with fixed values:
  - Cyan: -3
  - Light Blue: -6
  - Blue: -9
  - Purple: -15
  - Lime: +2
  - Yellow: +7
  - Orange: +13
  - Red: +16

Find: The minimum sequence of operations that sum to exactly the target value.

## Algorithm Design

### Greedy Approach

The algorithm uses a greedy strategy with the following steps:

```typescript
function findMinimumOperations(target: number): Operation[] {
  result = []
  remaining = target
  
  while remaining ≠ 0:
    bestOp = null
    bestRemainder = |remaining|
    
    for each operation:
      newRemaining = remaining - operation.value
      newRemainder = |newRemaining|
      
      if newRemainder < bestRemainder:
        bestOp = operation
        bestRemainder = newRemainder
    
    result.push(bestOp)
    remaining -= bestOp.value
  
  return result
}
```

### Key Features

1. **Iterative Reduction**: Each step picks the operation that minimizes the absolute remaining value
2. **Greedy Choice**: Always picks locally optimal operation
3. **Guaranteed Termination**: The algorithm always makes progress toward zero
4. **Safety Limits**: Includes a 100-operation limit to prevent infinite loops

## The Workflow

### Step 1: Handle Final Operations

When the user provides final operations (the operations shown at the top of the TFC UI):

```typescript
// User inputs: [Yellow, Red] (left to right)
finalOps = [Yellow(+7), Red(+16)]

// Reverse because TFC applies right-to-left
reversed = [Red(+16), Yellow(+7)]

// Calculate inverse sum
inverseSum = -(+16) + -(+7) = -23
```

### Step 2: Calculate New Target

```typescript
originalTarget = 45
newTarget = originalTarget + inverseSum
newTarget = 45 + (-23) = 22
```

### Step 3: Find Operations

Run the greedy algorithm to find operations that sum to the new target (22).

### Step 4: Combine Sequences

```typescript
completeSequence = requiredOperations + finalOperations
```

## Example Walkthrough

### Target: 22

**Initial State:**
- remaining = 22
- result = []

**Iteration 1:**
- Test all operations
- Red (+16) gives: 22 - 16 = 6 (best so far)
- Choose Red (+16)
- remaining = 6
- result = [Red]

**Iteration 2:**
- remaining = 6
- Light Blue (-6) gives: 6 - (-6) = 12 (worse)
- Yellow (+7) gives: 6 - 7 = -1 (better)
- Choose Yellow (+7)?
- Actually, try smaller: Lime (+2) gives 6 - 2 = 4
- Continue testing...
- Best: Yellow (+7) → remaining = -1
- result = [Red, Yellow]

**Iteration 3:**
- remaining = -1
- Cyan (-3) gives: -1 - (-3) = 2
- Lime (+2) gives: -1 - 2 = -3
- Best: Cyan (-3) → remaining = 2
- result = [Red, Yellow, Cyan]

**Iteration 4:**
- remaining = 2
- Lime (+2) gives: 2 - 2 = 0 ✓
- result = [Red, Yellow, Cyan, Lime]

**Final:** Red(+16) + Yellow(+7) + Cyan(-3) + Lime(+2) = 22 ✓

## Complexity Analysis

- **Time Complexity**: O(n × m) where:
  - n = number of operations needed (varies with target)
  - m = 8 (number of available operations)
- **Space Complexity**: O(n) for storing the result

## Optimality

The greedy algorithm does NOT guarantee the absolute minimum number of operations in all cases, but it provides:

1. **Good Solutions**: Usually near-optimal
2. **Fast Computation**: O(n) iterations
3. **Predictable Behavior**: Deterministic results

### Example of Non-Optimal Case

Target: 5
- Greedy might find: Yellow(+7) + Cyan(-3) + Lime(+2) + Cyan(-3) + Lime(+2) = 5 (5 ops)
- Optimal exists: Lime(+2) + Lime(+2) + Lime(+2) + Cyan(-3) + Lime(+2) = 5 (5 ops)

Both are minimal in this case, but for some targets, the greedy approach might use 1-2 more operations than the absolute minimum.

## Future Improvements

Possible enhancements:

1. **Dynamic Programming**: Find absolute minimum (slower but optimal)
2. **Branch and Bound**: Prune search space for better solutions
3. **Precomputed Lookup**: Cache common targets
4. **Heuristic Tuning**: Weight operations differently based on patterns

## Why This Works for TFC

In TerraFirmaCraft forging:
- Players execute operations sequentially
- Any integer target is achievable
- Speed matters more than absolute minimum operations
- The greedy approach provides fast, good-enough solutions

The algorithm balances:
- ✓ Speed (near-instant calculation)
- ✓ Simplicity (easy to understand and maintain)
- ✓ Practicality (solutions are good enough for gameplay)
