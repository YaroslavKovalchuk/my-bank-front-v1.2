import { TestBed, inject } from '@angular/core/testing';

import { MoneyTransferService } from './money-transfer.service';

describe('MoneyTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoneyTransferService]
    });
  });

  it('should be created', inject([MoneyTransferService], (service: MoneyTransferService) => {
    expect(service).toBeTruthy();
  }));
});
