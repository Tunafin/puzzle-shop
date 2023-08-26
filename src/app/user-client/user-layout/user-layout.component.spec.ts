import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { UserClientModule } from '../user-client.module';
import { UserLayoutComponent } from './user-layout.component';

describe('UserLayoutComponent', () => {
  let component: UserLayoutComponent;
  let fixture: ComponentFixture<UserLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLayoutComponent],
      imports: [
        AppCommonTestingModule,
        UserClientModule
      ]
    });
    fixture = TestBed.createComponent(UserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
