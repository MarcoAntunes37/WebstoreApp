import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Product } from '../_interfaces/Product';
import { ProductService } from '../_services/product.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { StorageService } from '../_services/storage.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
    standalone: true,
    imports: [NgIf, MatIconModule, NgFor, CurrencyPipe]
})
export class ProductDetailsComponent { 
  private productService = inject(ProductService);
  private storageService = inject(StorageService);
  @Input() id!: string;
  product!: Product;
  isOutOffStock: boolean = false
  isAboutVisible: boolean = false

  ngOnInit():void{    
    this.getProductById(this.id).subscribe(response=>
      {
        this.product = response
        this.product.quantity = 1
        if(this.product.quantity === 0){
          this.isOutOffStock = true
        }
      })
  }

  addToCart(item: any){
    this.storageService.addToCart(item)
  }

  removeCart(item: any){
    this.storageService.removeFromCart(item)
  }

  buyNow(){

  }

  aboutToggle(){
    this.isAboutVisible = !this.isAboutVisible
  }

  getProductById(id:string): Observable<Product>{
    return this.productService.getProductById(id);
  }

}
