import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject, takeUntil } from 'rxjs';

import { Product } from 'src/models/product.model';
import { UserProductService } from '../services/user-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isXSmall = false;
  destroyed = new Subject<void>();

  products: Product[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userProductService: UserProductService
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        // 會在一開始就觸發一次
        this.isXSmall = result.matches;
      });

    this.userProductService.getProducts().subscribe(res => {
      this.products = res.products.slice(0, 6);
    });
  }
}
