import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Product } from 'src/models/product.model';
import { AdminProductService } from './../services/admin-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  readonly columnsToDisplay: (keyof Product)[] = ['imageUrl','title', 'category', 'origin_price', 'price'];
  dataSource = new MatTableDataSource<Product>([]);
  isLoading = true;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private adminProductService: AdminProductService) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.adminProductService.getAllProducts().subscribe(res => {
      this.dataSource.data = res;
      this.isLoading = false;
    });
  }
}
