import { Injectable } from '@angular/core';
import { filter } from 'rxjs';

const USER_KEY = 'auth-user';
const CART_KEY = 'shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public addToCart(item: any): void{    
    let cart = []
    cart = JSON.parse(window.sessionStorage.getItem(CART_KEY)!) || []
    cart.push(item)
    console.log(item)
    window.sessionStorage.setItem(CART_KEY, JSON.stringify(cart))
  }

  public removeFromCart( prod: any): void {
    let cart: any[] = []
    cart = JSON.parse(window.sessionStorage.getItem(CART_KEY)!) || []
    let arrayWithoutDeleted = cart.filter((x: any) =>{
      return x.id !== prod.id
    })
    window.sessionStorage.removeItem(CART_KEY)
    window.sessionStorage.setItem(CART_KEY, JSON.stringify(arrayWithoutDeleted))
  }

  public clearCart(): void{
    window.sessionStorage.removeItem(CART_KEY)
  }

  public getCart(): any {
    const cart = window.sessionStorage.getItem(CART_KEY)
    if(cart){
      return JSON.parse(cart)
    }

    return {}
  }
}