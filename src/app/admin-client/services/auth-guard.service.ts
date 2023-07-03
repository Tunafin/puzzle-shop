import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { finalize, of } from 'rxjs';

import { environment } from 'src/environments/environment';

interface AdminSignin {
  status: boolean;
  message: string;
  uid: string;
  token: string;
  expired: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  readonly baseURL = environment.baseURL;

  private _adminToken: string;
  public get adminToken(): string {
    return this._adminToken;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this._adminToken = document.cookie.split(`token=`).pop()?.split(';').shift() ?? '';
  }

  /**
   * @param {string} username 登入的email
   * @param {string} password 密碼
   * @memberof AuthGuardService
   */
  login(username: string, password: string) {
    const url = this.baseURL + '/v2/admin/signin';
    const body = { username, password };
    return this.http.post<AdminSignin>(url, body).pipe().subscribe({
      next: (res) => {
        this._adminToken = res.token;
        document.cookie = `token=${res.token}; expires=${res.expired}; path=/;`;
        console.log('登入成功');

        if (this.router.url === '/admin/login') {
          this.router.navigate(['admin']);
        } else {
          const url = this.activatedRoute.snapshot.queryParams['url'];
          this.router.navigate([url]);
        }
      },
      error: () => {
        console.log('登入失敗');
      }
    });
  }

  logout() {
    const url = this.baseURL + '/v2/logout';
    return this.http.post<AdminSignin>(url, null).pipe(
      finalize(() => {
        this._adminToken = '';
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        this.router.navigate(['admin/login']);
      })
    );
  }

  checkLogin() {
    if (!this.adminToken) {
      return of(false);
    }

    const url = this.baseURL + '/v2/api/user/check';
    const headers = new HttpHeaders().set('Authorization', this.adminToken);

    return this.http.post<boolean>(url, null, { headers });
  }
}
