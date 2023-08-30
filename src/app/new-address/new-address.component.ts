import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Address } from '../_interfaces/Address';
import { Router } from '@angular/router';
import data from '../../assets/forms-data/estados-cidades2.json'

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent {
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private userService = inject(UserService);
  states = data.states;
  selectedState: any;
  filteredCity: any;
  cities = data.cities
  newAddressForm = new FormGroup({
    street: new FormControl<string>(''),
    city: new FormControl<string>(''),
    state: new FormControl<string>(''),
    country: new FormControl<string>(''),
    postalCode: new FormControl<string>('')
  })

  ngOnInit(){
  
  this.newAddressForm = this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    country: [''],
    postalCode: ['']
  })
 }

 filterCitiesOnChangeState(e: any){
    this.getStateId(e.target.value);
    this.filteredCity = this.cities.filter(x => x.state_id == this.selectedState.id)
 }

getStateId(name: string){
  this.selectedState = this.states.find(x => x.name == name)
}

  callNewAddressRoute(){
    let newAddress = this.newAddressForm.value;
    let userId = history.state.userId
    this.createAddress(newAddress, userId).subscribe({
      next: (n)=>{
        console.log(n)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        //this.router.navigate('user-details/'+ this.username)
      }
    })
  }

  createAddress(address: any, userId: string):Observable<Address>{
    return this.userService.createAddress(address, userId);
  }
}
