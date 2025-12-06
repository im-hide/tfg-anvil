import { Component } from '@angular/core';
import { ForgingService, Operation, CalculationResult } from './forging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  targetValue: number = 0;
  finalOperations: Operation[] = [];
  
  result: CalculationResult | null = null;
  
  get availableOperations(): Operation[] {
    return this.forgingService.operations;
  }

  get requiredOperationsReversed(): Operation[] {
    return this.result ? [...this.result.requiredOperations].reverse() : [];
  }

  get finalOperationsReversed(): Operation[] {
    return this.result ? [...this.result.finalOperations].reverse() : [];
  }

  get totalOperationsReversed(): Operation[] {
    if (!this.result) return [];
    // Reverse each section separately: reversed required ops + reversed final ops
    const reversedRequired = [...this.result.requiredOperations].reverse();
    const reversedFinal = [...this.result.finalOperations].reverse();
    return [...reversedRequired, ...reversedFinal];
  }

  constructor(private forgingService: ForgingService) {}

  addFinalOperation(operation: Operation): void {
    if (this.finalOperations.length < 3) {
      this.finalOperations.push(operation);
    }
  }

  removeFinalOperation(index: number): void {
    this.finalOperations.splice(index, 1);
  }

  clearFinalOperations(): void {
    this.finalOperations = [];
  }

  calculate(): void {
    // Use the finalOperations array directly
    this.result = this.forgingService.calculate(this.targetValue, this.finalOperations);
  }

  reset(): void {
    this.targetValue = 0;
    this.finalOperations = [];
    this.result = null;
  }

  /**
   * Determine text color based on background color for readability
   */
  getTextColor(backgroundColor: string): string {
    // Convert hex to RGB and calculate luminance
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light backgrounds, white for dark backgrounds
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
}
