import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './admin-client/services/auth-guard.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private authGuardService: AuthGuardService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { adminToken } = this.authGuardService;

    if (this._checkIfApiNeedToken(request.url)) {
      // 設定admin token到標頭，這裡暫不檢查是否需要權限
      const modifiedRequest = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        }
      });
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }

  private _checkIfApiNeedToken(url: string) {
    const { baseURL, apiPath } = environment;
    url = url.replace(baseURL, '');
    if (url === '/v2/logout' || url === '/v2/api/user/check' || url.startsWith(`/v2/api/${apiPath}/admin`)) {
      return true;
    }
    return false;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
