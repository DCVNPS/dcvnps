import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGalleriesComponent } from './manage-galleries.component';

describe('ManageGalleryProfilesComponent', () => {
  let component: ManageGalleriesComponent;
  let fixture: ComponentFixture<ManageGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGalleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
