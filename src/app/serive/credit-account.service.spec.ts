import { TestBed, inject } from '@angular/core/testing';

import { CreditAccountService } from './credit-account.service';

describe('CreditAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditAccountService]
    });
  });

  it('should be created', inject([CreditAccountService], (service: CreditAccountService) => {
    expect(service).toBeTruthy();
  }));
});
