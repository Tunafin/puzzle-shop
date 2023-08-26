import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { AdminNotFoundComponent } from './admin-not-found.component';

describe('AdminNotFoundComponent', () => {
  let component: AdminNotFoundComponent;
  let fixture: ComponentFixture<AdminNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNotFoundComponent],
      imports: [
        AppCommonTestingModule
      ]
    });
    fixture = TestBed.createComponent(AdminNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
