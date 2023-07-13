import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pagination } from 'src/models/pagination.model';
import { Product } from 'src/models/product.model';

interface GetProducts {
  products: Product[],
  pagination: Pagination,
}

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  readonly baseURL = `${environment.baseURL}/v2/api/${environment.apiPath}/admin`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const url = this.baseURL + '/products/all';
    return this.http.get<any>(url, {}).pipe(map(res => Object.values(res.products) as Product[]));
  }

  getProducts(page?: number, category?: string): Observable<GetProducts> {
    if (!page || page < 1) { page = 1; }
    let url = this.baseURL + `/products?page=${page}`;
    if (category) { url += `&category=${category}`; }
    return this.http.get<any>(url, {}).pipe(map(res => {
      const { products, pagination } = res;
      const newRes: GetProducts = { products, pagination };
      return newRes;
    }));
  }
}
