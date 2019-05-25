import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HvncarouselComponent } from './hvncarousel.component';

describe('HvncarouselComponent', () => {
  let component: HvncarouselComponent;
  let fixture: ComponentFixture<HvncarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HvncarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HvncarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
