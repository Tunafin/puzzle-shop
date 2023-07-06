import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    { name: '訂單列表', link: 'orders' },
  ];

  isXSmall = false;
  breadcrumbs: Breadcrumb[] = [];
  destroyed = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private authGuardService: AuthGuardService
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.isXSmall = result.matches;
      });

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
