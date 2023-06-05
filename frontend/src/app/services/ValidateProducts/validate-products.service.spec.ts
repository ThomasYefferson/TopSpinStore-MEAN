import { TestBed } from '@angular/core/testing';

import { ValidateProductsService } from './validate-products.service';

describe('ValidateProductsService', () => {
  let service: ValidateProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
