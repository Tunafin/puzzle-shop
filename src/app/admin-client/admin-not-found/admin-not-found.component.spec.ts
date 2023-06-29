import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotFoundComponent } from './admin-not-found.component';

describe('AdminNotFoundComponent', () => {
  let component: AdminNotFoundComponent;
  let fixture: ComponentFixture<AdminNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNotFoundComponent]
    });
    fixture = TestBed.createComponent(AdminNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
