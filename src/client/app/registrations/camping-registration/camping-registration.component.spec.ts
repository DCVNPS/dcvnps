import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingRegistrationComponent } from './camping-registration.component';

describe('CampingRegistrationComponent', () => {
  let component: CampingRegistrationComponent;
  let fixture: ComponentFixture<CampingRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampingRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampingRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
