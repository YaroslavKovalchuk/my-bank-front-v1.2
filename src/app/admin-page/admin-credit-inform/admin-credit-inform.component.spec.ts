import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreditInformComponent } from './admin-credit-inform.component';

describe('AdminCreditInformComponent', () => {
  let component: AdminCreditInformComponent;
  let fixture: ComponentFixture<AdminCreditInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreditInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreditInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
