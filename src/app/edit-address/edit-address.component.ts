import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Address } from '../_interfaces/Address';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  id!: string;
  address!: Address;
  editAddressForm = new FormGroup({
    street: new FormControl<string>(''),
    city: new FormControl<string>(''),
    state: new FormControl<string>(''),
    country: new FormControl<string>(''),
    postalCode: new FormControl<string>('')
  })

  ngOnInit(){
    this.id = history.state.userId
    this.address = history.state.address
    console.log(this.id, this.address)
    this.editAddressForm = this.fb.group({
      street: this.address.street,
      city: this.address.city,
      state: this.address.state,
      country: this.address.country,
      postalCode: this.address.postalCode
    })
  }

  editAddressOnClick(){
    console.log(this.address)
  }
}
