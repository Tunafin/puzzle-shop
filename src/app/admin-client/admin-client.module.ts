import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminNotFoundComponent } from './admin-not-found/admin-not-found.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';

const canActivateFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthGuardService);
  const router = inject(Router);

  // 這裡先簡單用是否有token來判斷是否為登入狀態
  if (authService.adminToken) {
    return true;
  }

  router.navigate(
    ['/admin/login'],
    {
      skipLocationChange: true,
      queryParams: { url: encodeURI(location.pathname) }
    }
  );

  return false;
};

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivateChild: [canActivateFn],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'orders', component: OrderListComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: AdminNotFoundComponent },
];

@NgModule({
  declarations: [
    AdminNotFoundComponent,
    LoginComponent,
    AdminLayoutComponent,
    ProductListComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
})
export class AdminClientModule { }
