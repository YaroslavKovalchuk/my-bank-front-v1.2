import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInformComponent } from './other-inform.component';

describe('OtherInformComponent', () => {
  let component: OtherInformComponent;
  let fixture: ComponentFixture<OtherInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
