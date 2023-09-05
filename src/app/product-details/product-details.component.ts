import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Product } from '../_interfaces/Product';
import { ProductService } from '../_services/product.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
    standalone: true,
    imports: [NgIf, MatIconModule, NgFor, CurrencyPipe]
})
export class ProductDetailsComponent { 
  private productService = inject(ProductService);
  @Input() id!: string;
  product!: Product;
  isAboutVisible: boolean = false

  ngOnInit():void{    
    this.getProductById(this.id).subscribe(response=>
      {
        this.product = response       
      })
  }

  aboutToggle(){
    this.isAboutVisible = !this.isAboutVisible
  }

  getProductById(id:string): Observable<Product>{
    return this.productService.getProductById(id);
  }

}
