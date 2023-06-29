import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin-client/admin-client.module').then(m => m.AdminClientModule) },
  { path: '', loadChildren: () => import('./user-client/user-client.module').then(m => m.UserClientModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
