import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { AdminClientModule } from '../admin-client.module';
import { ProductListNewComponent } from './product-list-new.component';

describe('ProductListNewComponent', () => {
  let component: ProductListNewComponent;
  let fixture: ComponentFixture<ProductListNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListNewComponent],
      imports: [
        AppCommonTestingModule,
        AdminClientModule
      ]
    });
    fixture = TestBed.createComponent(ProductListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
