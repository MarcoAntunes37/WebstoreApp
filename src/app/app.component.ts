import { Component, OnInit, inject, signal } from '@angular/core';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './reset.css']
})
export class AppComponent implements OnInit{
  private storageService = inject(StorageService)
  isLoggedIn = signal<boolean>(false);  
  username = signal<string>('');
  role = signal<string>('');
  notValidBefore?: EpochTimeStamp;
  expirationTime?: EpochTimeStamp;
  issuedAt?: EpochTimeStamp;
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

   ngOnInit(){
    this.checkAuthData();
  }  

  checkAuthData(){
    if(this.storageService.getUser().token)
      this.decodeJwtObject()

    if(this.username() != '')
      this.isLoggedIn.set(true)
  }

  decodeJwtObject(){
    var decodedTokenJson = JSON.parse(
      atob(this.storageService.getUser().token.split('.')[1])
    );
    
    const {unique_name, role, nbf, exp, iat} = decodedTokenJson
    
    this.username.set(unique_name);
    this.role.set(role);
    this.notValidBefore = nbf;
    this.expirationTime = exp;
    this.issuedAt = iat;
  }
}
