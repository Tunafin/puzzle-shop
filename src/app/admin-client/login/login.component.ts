import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject, takeUntil } from 'rxjs';

import { AuthGuardService } from './../services/auth-guard.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  formGroup: FormGroup;

  destroyed = new Subject<void>();
  isXSmall = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private authGuardService: AuthGuardService,
  ) {
    this.emailCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', Validators.required);
    this.formGroup = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });

    this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isXSmall = result.matches;
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  login() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }

    const value = this.formGroup.value;
    this.authGuardService.login(value.email, value.password);
  }
}
