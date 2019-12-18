import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoClassesComponent } from './photo-classes.component';

describe('PhotoClassesComponent', () => {
  let component: PhotoClassesComponent;
  let fixture: ComponentFixture<PhotoClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
