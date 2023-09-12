import { Component, Input, inject} from '@angular/core';
import { Router } from '@angular/router';
import { Address } from './address';
import { UserService } from 'src/app/_services/user.service';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.css'],
    standalone: true,
    imports: [MatIconModule, NgFor]
})
export class AddressDetailsComponent {  
  @Input() addresses!: any[]
  @Input() userId!: string
  @Input() username!: string
  private userService = inject(UserService)
  selectedAddress!: any;
  router = inject(Router)
 
  callNewAddressRoute(){
    this.router.navigate(
      ['user-details/'+this.username+'/new-address/'], {
        state: {
          userId: this.userId,
          lastUrl: this.router.url
        }
      }
    )
  }

  callEditAddressRoute(address: Address){    
    this.selectedAddress = address;
    this.router.navigate(
      ['user-details/'+this.username+'/edit-address/'], {
        state: {
          userId: this.userId,
          username: this.username,
          address: this.selectedAddress,
          lastUrl: this.router.url
        }
      }
    )
  }

  callDeleteAddressRoute(id: string){
    this.deleteAddress(id, this.userId).subscribe({
      next: (n) => {
        console.log(n)
        alert(n)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        window.location.reload();
      }
    })
  }

  deleteAddress(id: string, userId: string): Observable<any>{
    return this.userService.deleteAddress(id, userId);
  }
}
