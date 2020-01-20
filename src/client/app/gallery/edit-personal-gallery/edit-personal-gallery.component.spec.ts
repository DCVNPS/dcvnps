import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalGalleryComponent } from './edit-personal-gallery.component';

describe('EditPersonalGalleryComponent', () => {
  let component: EditPersonalGalleryComponent;
  let fixture: ComponentFixture<EditPersonalGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
