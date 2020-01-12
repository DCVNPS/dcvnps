import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VnpsClassesComponent } from './vnps-classes.component';

describe('PhotoClassesComponent', () => {
  let component: VnpsClassesComponent;
  let fixture: ComponentFixture<VnpsClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VnpsClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VnpsClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
