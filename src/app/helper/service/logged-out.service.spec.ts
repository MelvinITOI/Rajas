import { TestBed } from '@angular/core/testing';

import { LoggedOutService } from './logged-out.service';

describe('LoggedOutService', () => {
  let service: LoggedOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
