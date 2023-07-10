import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { finalize } from 'rxjs';

import { Product } from 'src/models/product.model';
import { UserProductService } from 'src/app/user-client/services/user-product.service';
import { AdminProductService } from '../services/admin-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  isLoading = true;
  product?: Product;
  isIdNotFound = false;

  constructor(
    private route: ActivatedRoute,
    private adminProductService: AdminProductService,
    private userProductService: UserProductService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isIdNotFound = true;
      return;
    }

    this.userProductService.getProduct(id).pipe(finalize(() => this.isLoading = false)).subscribe(res => {
      this.product = res;
    });
  }
}
