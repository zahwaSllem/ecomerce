import { TestBed } from '@angular/core/testing';

import { CateoriesService } from './cateories.service';

describe('CateoriesService', () => {
  let service: CateoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CateoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
