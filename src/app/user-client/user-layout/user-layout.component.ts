import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconRegistry } from '@angular/material/icon';

import { Subject, takeUntil } from 'rxjs';

import SocialMediaIcons from './social-media-icons';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {

  readonly infoList: { name: string, text: string }[] = [
    { name: 'Email', text: 'puzzle@house.com' },
    { name: '服務專線', text: '0800-888-777' },
    { name: '服務時間', text: '平日08:00-17:00 (不含例假日)' }
  ]

  isXSmall = false;
  destroyed = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        // 會在一開始就觸發一次
        this.isXSmall = result.matches;
      });

    iconRegistry.addSvgIconLiteral('facebook', sanitizer.bypassSecurityTrustHtml(SocialMediaIcons.facebook));
    iconRegistry.addSvgIconLiteral('twitter-old', sanitizer.bypassSecurityTrustHtml(SocialMediaIcons.twitterOld));
    iconRegistry.addSvgIconLiteral('instagram', sanitizer.bypassSecurityTrustHtml(SocialMediaIcons.instagram));
  }
}
