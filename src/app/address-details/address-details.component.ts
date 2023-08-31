import { Component, Input, inject} from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../_interfaces/Address';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
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
      ['user-details/'+this.username+'/new-address/'],
      {
        state: {
          userId: this.userId
        }
      }
    )
  }

  callEditAddressRoute(address: Address){    
    this.selectedAddress = address;
    this.router.navigate(
      ['user-details/'+this.username+'/edit-address/'],{
        state: {
          userId: this.userId,
          username: this.username,
          address: this.selectedAddress
        }
      }
    )
  }

  callDeleteAddressRoute(id: string){
    this.deleteAddress(id, this.userId).subscribe({
      next: (n) => {
        console.log(n)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {

      }
    })
  }

  deleteAddress(id: string, userId: string): Observable<any>{
    return this.userService.deleteAddress(id, userId);
  }
}
