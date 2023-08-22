import { TestBed } from '@angular/core/testing';

import { ChequierService } from './chequier.service';

describe('ChequierService', () => {
  let service: ChequierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
