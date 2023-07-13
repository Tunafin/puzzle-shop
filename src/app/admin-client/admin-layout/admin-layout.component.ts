import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { Subject, filter, map, takeUntil } from 'rxjs';

import { Breadcrumb } from 'src/models/breadcrumb.model';
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
    { name: '產品列表', link: 'products' },
    { name: '產品列表(new)', link: 'products_new' },
    { name: '訂單列表', link: 'orders' },
  ];

  readonly isInitSidenavOpen: boolean;

  isXSmall = false;
  breadcrumbs: Breadcrumb[] = [];
  destroyed = new Subject<void>();

  @ViewChild(MatSidenav) sidenav?: MatSidenav;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private authGuardService: AuthGuardService
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        // 會在一開始就觸發一次
        this.isXSmall = result.matches;
      });

    this.isInitSidenavOpen = !this.isXSmall;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute.root),
    ).subscribe(route => {
      this.breadcrumbs = this.getBreadcrumbs(route);
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getBreadcrumbs(route: ActivatedRoute, breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const nextChild = route.firstChild;

    if (!nextChild) {
      return breadcrumbs;
    }

    const nextBreadcrumb = nextChild?.snapshot.data['breadcrumb'];

    if (nextBreadcrumb) {
      return this.getBreadcrumbs(nextChild, [...breadcrumbs, nextBreadcrumb]);
    }

    return this.getBreadcrumbs(nextChild, [...breadcrumbs]);
  }

  logout() {
    this.authGuardService.logout().subscribe();
  }
}
