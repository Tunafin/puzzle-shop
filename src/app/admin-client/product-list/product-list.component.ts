import { Component } from '@angular/core';

import { AdminProductService } from './../services/admin-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  constructor(private adminProductService: AdminProductService) {
    this.adminProductService.getProducts(2, '可').subscribe(res => {
      // TODOs
      console.log(res);
    });
  }
}
