import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from 'src/models/product.model';

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

  getProducts(page?: number, category?: string): Observable<Product[]> {
    if (!page || page < 1) { page = 1; }
    let url = this.baseURL + `/products?page=${page}`;
    if (category) { url += `&category=${category}`; }
    return this.http.get<any>(url, {}).pipe(map(res => (res.products) as Product[]));
  }

  getProduct(id: string): Observable<Product> {
    let url = this.baseURL + `/product/${id}`;
    return this.http.get<any>(url, {}).pipe(map(res => (res.product) as Product));
  }
}
