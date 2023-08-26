import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { AdminClientModule } from '../admin-client.module';
import { OrderListComponent } from './order-list.component';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListComponent],
      imports: [
        AppCommonTestingModule,
        AdminClientModule
      ]
    });
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
