import { Component, inject, computed, signal } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { NgFor, CurrencyPipe } from '@angular/common';
import { CartItem } from '../_interfaces/CartItem';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css'],
    imports: [NgFor, CurrencyPipe],
    standalone: true
})
export class ShoppingCartComponent {
    private storageService = inject(StorageService)
    cartItems = signal<CartItem[]>([])

    ngOnInit():void{
        this.cartItems.set(this.storageService.getCart())
        for(let item of this.cartItems()){
            item.cartQnt = 1
        }
        console.log(this.cartItems())
    }

    addQuantity(item: any) {
        item.cartQnt = item.cartQnt + 1
    }

    removeQuantity(item: any){
        item.cartQnt > 1 ? item.cartQnt = item.cartQnt - 1 : item.cartQnt = 1
    }

    removeFromCart(item: any){
        this.storageService.removeFromCart(item)
    }
}
