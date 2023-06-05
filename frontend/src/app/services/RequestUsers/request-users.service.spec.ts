import { TestBed } from '@angular/core/testing';

import { RequestUsersService } from './request-users.service';

describe('RequestUsersService', () => {
  let service: RequestUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
