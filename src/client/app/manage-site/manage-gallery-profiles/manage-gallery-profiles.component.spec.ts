import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGalleryProfilesComponent } from './manage-gallery-profiles.component';

describe('ManageGalleryProfilesComponent', () => {
  let component: ManageGalleryProfilesComponent;
  let fixture: ComponentFixture<ManageGalleryProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGalleryProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGalleryProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
