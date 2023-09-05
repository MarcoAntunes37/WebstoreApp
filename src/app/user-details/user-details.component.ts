import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { User } from '../_interfaces/User';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { CreditCardDetailsComponent } from '../credit-card-details/credit-card-details.component';
import { AddressDetailsComponent } from '../address-details/address-details.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css'],
    standalone: true,
    imports: [ProfileDetailsComponent, AddressDetailsComponent, CreditCardDetailsComponent]
})
export class UserDetailsComponent {
  private userService = inject(UserService)  
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  user!: User;
  
  @Input() username!:string;

   ngOnInit(){
    this.loadProfileData()    
 }

 loadProfileData(){
  this.isLoading.set(true);
  setTimeout( () =>
  of(this.getUserByUsername(this.username).subscribe({
    next: (n: User)=> {
     this.user = n;
    },
    error: (e: WritableSignal<string>) => {
      this.errorMessage = e;
    },
    complete: () => {
      console.log('Profile loaded')
    }
  }))
  , 0)
 }

 getUserByUsername(username:string): Observable<User>{
  return this.userService.getUserByUsername(username);
}
}
