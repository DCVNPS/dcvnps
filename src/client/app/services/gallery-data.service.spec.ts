import { TestBed } from '@angular/core/testing';

import { GalleryDataService } from './gallery-data.service';

describe('GalleryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryDataService = TestBed.get(GalleryDataService);
    expect(service).toBeTruthy();
  });
});
