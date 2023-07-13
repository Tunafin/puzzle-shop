import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

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
export class UserProductService {

  readonly baseURL = `${environment.baseURL}/v2/api/${environment.apiPath}`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const url = this.baseURL + '/products/all';
    return this.http.get<any>(url, {}).pipe(map(res => Object.values(res.products) as Product[]));
  }

  // TODO swagger上這支api的model似乎有錯，到時寫到這段在確認
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

  getProduct(id: string): Observable<Product> {
    let url = this.baseURL + `/product/${id}`;
    return this.http.get<any>(url, {}).pipe(map(res => (res.product) as Product));
  }
}
