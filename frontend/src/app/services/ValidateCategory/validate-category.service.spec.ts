import { TestBed } from '@angular/core/testing';

import { ValidateCategoryService } from './validate-category.service';

describe('ValidateCategoryService', () => {
  let service: ValidateCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
