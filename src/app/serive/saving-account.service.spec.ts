import { TestBed, inject } from '@angular/core/testing';

import { SavingAccountService } from './saving-account.service';

describe('SavingAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavingAccountService]
    });
  });

  it('should be created', inject([SavingAccountService], (service: SavingAccountService) => {
    expect(service).toBeTruthy();
  }));
});
