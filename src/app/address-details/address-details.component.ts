import { Component, Input, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent {
  private fb = inject(FormBuilder)
  isAddressEditable = signal<boolean>(false)
  @Input() addresses!: any[]

  ngInit(){
    this.fb = new FormBuilder()
  }
  
  updateAddressForm = new FormGroup({
    street: new FormControl<string>(''),
    city: new FormControl<string>(''),
    state: new FormControl<string>(''),
    country: new FormControl<string>(''),
    postalCode: new FormControl<string>('')
  })

  changeAddressEditable(){
    this.isAddressEditable.set(!this.isAddressEditable())
  }

  newAddress(){
    console.log("new address")
  }

  editAddress(id:string){
    
  }
  
  deleteAddress(id: string){
    console.log("delete address" +id)
  }
}
