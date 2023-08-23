import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _title = 'Puzzle Shop';
  public get title() {
    return this._title;
  }
  public set title(value) {
    if (this._title != value) {
      this._title = value;
      this.titleService.setTitle(this._title);

    }
  }

  private isAdminPage = false;

  constructor(private router: Router, private titleService: Title) {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          const isAdminPage = event.url.startsWith('/admin');
          if (this.isAdminPage != isAdminPage) {
            this.isAdminPage = isAdminPage
            this.title = isAdminPage ? 'Puzzle Admin' : 'Puzzle Shop';

            const favicon: HTMLLinkElement = document.querySelector('#favicon')!;
            favicon.href = isAdminPage ? 'assets/favicon_ng.ico' : 'assets/favicon.ico';
          }
        }
      });
  }
}
