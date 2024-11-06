import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../types';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, LoadingComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  url = 'https://fakestoreapi.com/products?limit=14';
  products: Product[] = [];
  

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(
      (response) => {
        this.products = response as any[];
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

