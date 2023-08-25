import { Component, Input, OnInit, Output, inject, signal } from '@angular/core';
import { ProductService } from '../_services/product.service';
import {Product} from '../_interfaces/Product'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService)
  isLoading = signal<boolean>(false);  
  errorMessage = signal<string>('');
  products = signal<Product[]>([]);

  ngOnInit() {
    this.loadProductList()
  }

  getProducts(): Observable<Product[]>{
    return this.productService.getProducts();
  }

  loadProductList(){
    this.isLoading.set(true);
    setTimeout( () =>
    of(this.getProducts()).subscribe({
      next: (n)=> {
        n.subscribe(response => 
            response.map(product => {
              this.products().push(product)
            }),           
        )
      },
      error: (e)=> {
        this.isLoading.set(false);
        this.errorMessage.set(e);
        console.log(this.errorMessage())
      },
      complete: () => {
        this.isLoading.set(false);
      }
    }), 0)
  }
  
}
