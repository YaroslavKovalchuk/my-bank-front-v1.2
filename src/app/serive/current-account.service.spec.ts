import { TestBed, inject } from '@angular/core/testing';

import { CurrentAccountService } from './current-account.service';

describe('CurrentAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentAccountService]
    });
  });

  it('should be created', inject([CurrentAccountService], (service: CurrentAccountService) => {
    expect(service).toBeTruthy();
  }));
});
