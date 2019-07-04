import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPhotoComponent } from './author-photo.component';

describe('AuthorPhotoComponent', () => {
  let component: AuthorPhotoComponent;
  let fixture: ComponentFixture<AuthorPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
