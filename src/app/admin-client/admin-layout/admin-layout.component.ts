import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject, takeUntil } from 'rxjs';

import { AuthGuardService } from './../services/auth-guard.service';

interface NavItem {
  name: string;
  link: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  readonly navItems: NavItem[] = [
    { name: '產品列表', link: 'products'},
    { name: '訂單列表', link: 'orders'},
  ];

  isXSmall = false;
  destroyed = new Subject<void>();

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
