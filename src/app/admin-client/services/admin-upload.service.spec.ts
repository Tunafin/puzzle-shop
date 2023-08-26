import { TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { AdminUploadService } from './admin-upload.service';

describe('AdminUploadService', () => {
  let service: AdminUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppCommonTestingModule]
    });
    service = TestBed.inject(AdminUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
