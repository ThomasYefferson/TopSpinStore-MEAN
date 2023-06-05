import { TestBed } from '@angular/core/testing';

import { RequestCategoryService } from './request-category.service';

describe('RequestCategoryService', () => {
  let service: RequestCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
