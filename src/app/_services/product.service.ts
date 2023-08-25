import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_interfaces/Product';

const API_URL = 'https://localhost:7296/api/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient)

  public getProducts():Observable<any> {
    return this.http.get(API_URL);
  }
  public getProductById(id:string):Observable<any> {
    return this.http.get(`${API_URL}${id}`);
  }

}
