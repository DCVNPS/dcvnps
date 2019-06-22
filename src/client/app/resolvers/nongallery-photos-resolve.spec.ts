import { NonGalleryPhotosResolve } from './nongallery-photos-resolve';
import { ApiService } from '../services/api.service';

describe('NonGalleryPhotosResolve', () => {
  it('should create an instance', () => {
    const api = ApiService
    expect(new NonGalleryPhotosResolve(this.api)).toBeTruthy();
  });
});
