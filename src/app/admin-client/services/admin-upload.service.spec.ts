import { TestBed } from '@angular/core/testing';

import { AdminUploadService } from './admin-upload.service';

describe('AdminUploadService', () => {
  let service: AdminUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
