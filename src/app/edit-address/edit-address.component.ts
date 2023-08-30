import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Address } from '../_interfaces/Address';
import { Observable } from 'rxjs';
import data from '../../assets/forms-data/estados-cidades2.json'

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  states = data.states
  selectedState: any;
  filteredCity: any;
  cities = data.cities
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
    this.editAddressForm = this.fb.group({
      street: this.address.street,
      city: this.address.city,
      state: this.address.state,
      country: this.address.country,
      postalCode: this.address.postalCode
    })
  }

  filterCitiesOnChangeState(e: any){
    this.getStateId(e.target.value);
    this.filteredCity = this.cities.filter(x => x.state_id == this.selectedState.id)
 }

  getStateId(name: string){
    this.selectedState = this.states.find(x => x.name == name)
  }

  editAddressOnClick(){
    const {street, city, state, country, postalCode } = this.editAddressForm.value

    let addressUpdate = {
      id: this.address.id,
      street: street,
      city: city,
      state: state,
      country: country,
      postalCode: postalCode
    }

    this.updateAddress(addressUpdate, this.id).subscribe({
      next: (n) =>{
        console.log(n)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () =>{
        
      }
    })
  }

  updateAddress(address: any, id: string): Observable<any>{
    return this.userService.updateAddress(address, id);
  }
}
