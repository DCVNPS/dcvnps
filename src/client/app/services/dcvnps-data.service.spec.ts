import { TestBed } from '@angular/core/testing';

import { DcvnpsDataService } from './dcvnps-data.service';

describe('DcvnpsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DcvnpsDataService = TestBed.get(DcvnpsDataService);
    expect(service).toBeTruthy();
  });
});
