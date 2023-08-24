import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { NotFoundComponent } from './not-found/not-found.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './widgets/product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '', component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // { path: 'products', component: HomeComponent }, // TODO
      { path: 'products/:id', component: ProductDetailComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    NotFoundComponent,
    UserLayoutComponent,
    HomeComponent,
    ProductCardComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,

    RouterModule.forChild(routes)
  ]
})
export class UserClientModule { }
