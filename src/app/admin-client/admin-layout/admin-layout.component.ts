import { Component } from '@angular/core';

import { AuthGuardService } from './../services/auth-guard.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(
    private authGuardService: AuthGuardService
  ) {

  }

  logout() {
    this.authGuardService.logout().subscribe();
  }
}
