import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselsaveComponent } from './carouselsave.component';

describe('CarouselsaveComponent', () => {
  let component: CarouselsaveComponent;
  let fixture: ComponentFixture<CarouselsaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselsaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselsaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
