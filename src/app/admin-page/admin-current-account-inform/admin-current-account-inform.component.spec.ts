import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCurrentAccountInformComponent } from './admin-current-account-inform.component';

describe('AdminCurrentAccountInformComponent', () => {
  let component: AdminCurrentAccountInformComponent;
  let fixture: ComponentFixture<AdminCurrentAccountInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCurrentAccountInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCurrentAccountInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
