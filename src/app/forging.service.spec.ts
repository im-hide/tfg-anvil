import { TestBed } from '@angular/core/testing';
import { ForgingService } from './forging.service';

describe('ForgingService', () => {
  let service: ForgingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have 8 operations defined', () => {
    expect(service.operations.length).toBe(8);
  });

  it('should correctly inverse and calculate new target', () => {
    const yellow = service.getOperationByName('Yellow')!;
    const red = service.getOperationByName('Red')!;
    
    const result = service.calculate(45, [yellow, red]);
    
    // Yellow (+7) and Red (+16) reversed = Red then Yellow = +23
    // Inversed = -23
    // New target = 45 + (-23) = 22
    expect(result.originalTarget).toBe(45);
    expect(result.inversedSum).toBe(-23);
    expect(result.newTarget).toBe(22);
  });

  it('should find operations to reach target 22', () => {
    const result = service.findMinimumOperations(22);
    
    // Calculate the sum of the operations
    const sum = result.reduce((acc, op) => acc + op.value, 0);
    
    expect(sum).toBe(22);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle zero target', () => {
    const result = service.findMinimumOperations(0);
    expect(result.length).toBe(0);
  });

  it('should handle negative targets', () => {
    const result = service.findMinimumOperations(-15);
    const sum = result.reduce((acc, op) => acc + op.value, 0);
    expect(sum).toBe(-15);
  });

  it('should get operation by name', () => {
    const cyan = service.getOperationByName('Cyan');
    expect(cyan).toBeDefined();
    expect(cyan?.value).toBe(-3);
    
    const red = service.getOperationByName('Red');
    expect(red).toBeDefined();
    expect(red?.value).toBe(16);
  });
});
