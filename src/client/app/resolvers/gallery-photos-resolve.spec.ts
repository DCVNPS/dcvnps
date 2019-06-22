import { TestBed } from '@angular/core/testing';

import { GalleryPhotosResolve } from './gallery-photos-resolve';

describe('GalleryPhotosResolve', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryPhotosResolve = TestBed.get(GalleryPhotosResolve);
    expect(service).toBeTruthy();
  });
});
