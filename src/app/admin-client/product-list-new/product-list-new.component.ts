import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Pagination } from 'src/models/pagination.model';
import { Product } from 'src/models/product.model';
import { CustomPaginatorIntl } from 'src/app/app.module';
import { AdminProductService } from './../services/admin-product.service';

@Component({
  selector: 'app-product-list-new',
  templateUrl: './product-list-new.component.html',
  styleUrls: ['./product-list-new.component.scss'],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl
    }
  ]
})
export class ProductListNewComponent {

  readonly columnsToDisplay: (keyof Product)[] = ['imageUrl', 'title', 'category', 'origin_price', 'price', 'id'];
  products: Product[] = [];
  pagination?: Pagination;
  isLoading = true;

  categoryCtrl = new FormControl<string>('');

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminProductService: AdminProductService,
  ) {
  }

  ngOnInit(): void {
    this.queryProducts();
  }

  queryProducts(page?: number) {
    this.products = [];
    this.isLoading = true;
    this.adminProductService.getProducts(page, this.categoryCtrl.value!).subscribe(res => {
      this.products = res.products;
      this.pagination = res.pagination;
      this.isLoading = false;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.queryProducts(event.pageIndex + 1);
  }

  confirmDelete(product: Product) {
    // TODO 確認刪除視窗

    this.adminProductService.deleteProduct(product.id).subscribe(res => {
      this.snackBar.open(res.message, '關閉', { duration: 2000 });
      this.queryProducts();
    });
  }
}
