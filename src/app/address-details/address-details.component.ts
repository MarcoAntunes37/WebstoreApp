import { Component, Input, inject} from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../_interfaces/Address';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent {  
  @Input() addresses!: any[]
  @Input() userId!: string
  @Input() username!: string
  selectedAddress!: any;
  router = inject(Router)
 
  callEditAddressRoute(address: Address){    
    this.selectedAddress = address;
    this.router.navigate(
      ['user-details/'+this.username+'/edit-address/'],{
        state: {
          userId: this.userId,
          address: this.selectedAddress
        }
      }
    )
  }

  callNewAddressRoute(){

  }

  callDeleteAddressRoute(){

  }
}
