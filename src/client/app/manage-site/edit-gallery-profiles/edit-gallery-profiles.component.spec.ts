import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGalleryProfilesComponent } from './edit-gallery-profiles.component';

describe('EditGalleryProfilesComponent', () => {
  let component: EditGalleryProfilesComponent;
  let fixture: ComponentFixture<EditGalleryProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGalleryProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGalleryProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
