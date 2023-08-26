import { TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { AdminProductService } from './admin-product.service';

describe('AdminProductService', () => {
  let service: AdminProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppCommonTestingModule]
    });
    service = TestBed.inject(AdminProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
