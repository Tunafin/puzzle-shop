import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject, takeUntil } from 'rxjs';

import { AuthGuardService } from './../services/auth-guard.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  destroyed = new Subject<void>();
  isXSmall = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authGuardService: AuthGuardService
  ) {
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

  logout() {
    this.authGuardService.logout().subscribe();
  }
}
