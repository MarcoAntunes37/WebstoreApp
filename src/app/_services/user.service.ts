import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_interfaces/User';
import { StorageService } from './storage.service';
import { UserChangePassword } from '../_interfaces/UserChangePassword';
import { Address } from '../_interfaces/Address';
import { CreditCard } from '../_interfaces/CreditCard';

const API_URL = 'https://localhost:7296/api/users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageService= inject(StorageService);
  private http = inject(HttpClient)

  httpHeader: HttpHeaders = new HttpHeaders({
    'Authorization': this.storageService.getUser().token,
  })

 getUserById(id: string):Observable<any> {  
  return this.http.get(`${API_URL}${id}`);   
 }

 getUserByUsername(username: string):Observable<any> {  
  return this.http.get(`${API_URL}details/${username}`, {headers: this.httpHeader });   
 }

 createUser(user: User):Observable<any>{
  return this.http.post(API_URL, user);
 }

 createAddress(address: Address, userId: string):Observable<any>{
  return this.http.post(`${API_URL}${userId}/address`, address)
 }

 createCreditCard(creditcard: CreditCard, userId: string): Observable<any>{
  return this.http.post(`${API_URL}${userId}/creditcard`, creditcard)
 }

 updateUser(user: any, id: string):Observable<any> {
  return this.http.put(`${API_URL}${id}`, user)
 }

 updateUserPassword(user: UserChangePassword, id: string):Observable<any>{
  return this.http.put(`${API_URL}${id}/password`, user)
 }

 updateAddress(address: any, userId: string):Observable<any>{
  return this.http.put(`${API_URL}${userId}/address`, address);
 }

 updateCreditCard(creditCard: any, userId: string):Observable<any>{
  return this.http.put(`${API_URL}${userId}/creditcard`, creditCard);
 }

 deleteUser(id: string):Observable<any> {
   return this.http.delete(`${API_URL}${id}`);   
 }

 deleteAddress(id: string, userId: string ): Observable<any>{
  return this.http.delete(`${API_URL}${userId}/address`, { params: { addressId: id } });
 }

 deleteCreditCard(id: string, userId: string ): Observable<any>{
  return this.http.delete(`${API_URL}${userId}/creditCard`, { params: { creditCardId: id } });
 }
}