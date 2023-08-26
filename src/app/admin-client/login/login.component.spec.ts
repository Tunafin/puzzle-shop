import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { AdminClientModule } from '../admin-client.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        AppCommonTestingModule,
        AdminClientModule
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
