import { TestBed, inject } from '@angular/core/testing';

import { PersonalInfoService } from './personal-info.service';

describe('PersonalInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalInfoService]
    });
  });

  it('should be created', inject([PersonalInfoService], (service: PersonalInfoService) => {
    expect(service).toBeTruthy();
  }));
});
