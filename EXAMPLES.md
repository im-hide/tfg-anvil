# TerraFirmaCraft Forging Calculator - Examples

## Example 1: Basic Forging

**In-Game Scenario:**
- Target value: 45
- Final operations shown: Yellow (+7), Red (+16)

**Steps:**
1. Enter `45` as target value
2. Select `Yellow` in Final Operation 1
3. Select `Red` in Final Operation 2
4. Click Calculate

**Result:**
- Original Target: 45
- Inversed Sum: -23 (because Yellow +7 and Red +16 reversed and inversed)
- New Target: 22 (45 + (-23))
- Required Operations: The app calculates minimum ops to reach 22
- Complete Sequence: Required ops + Yellow + Red

---

## Example 2: Single Final Operation

**In-Game Scenario:**
- Target value: 30
- Final operation: Blue (-9)

**Steps:**
1. Enter `30` as target value
2. Select `Blue` in Final Operation 1
3. Click Calculate

**Result:**
- Original Target: 30
- Inversed Sum: +9 (Blue is -9, inversed is +9)
- New Target: 39 (30 + 9)
- The app finds minimum operations to reach 39

---

## Example 3: Three Final Operations

**In-Game Scenario:**
- Target value: 100
- Final operations: Lime (+2), Orange (+13), Purple (-15)

**Steps:**
1. Enter `100` as target value
2. Select `Lime` in Final Operation 1
3. Select `Orange` in Final Operation 2
4. Select `Purple` in Final Operation 3
5. Click Calculate

**Result:**
- Final operations applied right-to-left in-game: Purple, Orange, Lime
- Inversed: +15, -13, -2 = 0
- New Target: 100 + 0 = 100
- Required operations to reach 100

---

## Understanding the Algorithm

The calculator uses a **greedy algorithm** to find the minimum number of operations:

1. **Start with the target value**
2. **Pick the operation** that gets closest to zero
3. **Subtract that operation** from the remaining value
4. **Repeat** until you reach exactly zero

### Why It Works

TFC forging allows you to combine operations to hit exact values. The algorithm:
- Prioritizes larger operations (by absolute value) first
- Adjusts based on whether you need to go up or down
- Ensures you land exactly on the target

---

## Operation Strategy Tips

### For Positive Targets:
- Use Red (+16) and Orange (+13) for large values
- Use Yellow (+7) and Lime (+2) for fine-tuning

### For Negative Targets:
- Use Purple (-15) and Blue (-9) for large negative values
- Use Light Blue (-6) and Cyan (-3) for fine-tuning

### Optimal Sequences:
The algorithm automatically finds efficient paths. For example:
- Target 22 might use: Red (+16) + Yellow (+7) + Cyan (-3) + Lime (+2)
- Target -20 might use: Purple (-15) + Light Blue (-6) + Lime (+2) + Cyan (-3)

---

## Common Patterns

| Target | Possible Sequence |
|--------|------------------|
| +16 | Red |
| +13 | Orange |
| +10 | Orange + Cyan |
| +7 | Yellow |
| +5 | Yellow + Lime + Cyan + Cyan |
| +2 | Lime |
| -3 | Cyan |
| -6 | Light Blue |
| -9 | Blue |
| -12 | Blue + Cyan |
| -15 | Purple |

---

## Troubleshooting

**Q: Why do I input final operations left-to-right?**
A: To mirror the in-game UI. The calculator knows they're applied right-to-left and handles the reversal automatically.

**Q: Why can't I fill Final Operation 3 before Operation 2?**
A: The UI enforces left-to-right filling to prevent errors and match the in-game display order.

**Q: The sequence seems long. Is it optimal?**
A: The greedy algorithm finds *a* minimal sequence, but there might be multiple valid minimal sequences. The calculator picks one efficiently.

**Q: Can I achieve any target value?**
A: Yes! The 8 operations can combine to reach any integer value, though some require more operations than others.
