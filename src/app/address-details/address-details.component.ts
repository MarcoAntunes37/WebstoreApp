import { Component, Input, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent {  
  @Input() addresses!: any[]
  @Input() userId!: string

  newAddress(){
    console.log("new address")
  }

  editAddress(id:string){
    console.log("editAddress"+id)
  }
  
  deleteAddress(id: string){
    console.log("delete address" +id)
  }
}
