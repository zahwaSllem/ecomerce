import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { outhGuard } from './outh.guard';

describe('outhGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => outhGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
