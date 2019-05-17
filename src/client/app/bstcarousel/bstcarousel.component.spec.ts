import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BstcarouselComponent } from './bstcarousel.component';

describe('BstcarouselComponent', () => {
  let component: BstcarouselComponent;
  let fixture: ComponentFixture<BstcarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BstcarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BstcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
