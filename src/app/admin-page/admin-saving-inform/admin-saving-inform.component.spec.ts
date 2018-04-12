import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSavingInformComponent } from './admin-saving-inform.component';

describe('AdminSavingInformComponent', () => {
  let component: AdminSavingInformComponent;
  let fixture: ComponentFixture<AdminSavingInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSavingInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSavingInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
