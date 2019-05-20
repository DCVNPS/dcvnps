import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VnpscarouselComponent } from './vnpscarousel.component';

describe('VnpscarouselComponent', () => {
  let component: VnpscarouselComponent;
  let fixture: ComponentFixture<VnpscarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VnpscarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VnpscarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
