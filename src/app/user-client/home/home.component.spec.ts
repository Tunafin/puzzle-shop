import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommonTestingModule } from 'src/app/app-common-testing.module';
import { UserClientModule } from '../user-client.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        AppCommonTestingModule,
        UserClientModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
