import { TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { UserProductService } from './user-product.service';

describe('UserProductService', () => {
  let service: UserProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppCommonTestingModule]
    });
    service = TestBed.inject(UserProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
