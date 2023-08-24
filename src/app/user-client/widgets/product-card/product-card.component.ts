import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product?: Product;

  constructor(private router: Router) { }

  navigateToProductPage() {
    if (this.product) {
      this.router.navigate(['/products', this.product.id]);
    }
  }
}
