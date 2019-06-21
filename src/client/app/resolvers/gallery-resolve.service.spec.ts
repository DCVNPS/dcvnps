import { TestBed } from '@angular/core/testing';

import { GalleryResolveService } from './gallery-resolve.service';

describe('GalleryResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryResolveService = TestBed.get(GalleryResolveService);
    expect(service).toBeTruthy();
  });
});
