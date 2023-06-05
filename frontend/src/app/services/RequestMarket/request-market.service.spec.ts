import { TestBed } from '@angular/core/testing';

import { RequestMarketService } from './request-market.service';

describe('RequestMarketService', () => {
  let service: RequestMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
