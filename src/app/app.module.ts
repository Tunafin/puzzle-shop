import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';

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
      const modifiedRequest = request.clone({
        setHeaders: {
          /**
           * 不設置Content-Type為json，否則上傳檔案會出錯，
           * 通常情況Angular會幫我們處理此部分而不需自行設置。
           */
          // 'Content-Type': 'application/json',
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

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  /** 這裡的length是指api丟回來的總頁數 */
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length > 0) {
      return `第${page + 1}頁 (共${length}頁)`;
    } else {
      return `沒有資料`;
    }
  };
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
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
