import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Address } from '../_interfaces/Address';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
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
  isRegisterFailed = false;
  errorMessage = '';
  submitted = false; 
  newAddressForm = new FormGroup({
    street: new FormControl<string>('', [
      Validators.required
    ]),
    city: new FormControl<string>('', [
      Validators.required
    ]),
    state: new FormControl<string>('', [
      Validators.required
    ]),
    country: new FormControl<string>('', [
      Validators.required
    ]),
    postalCode: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8)
    ])
  })

  ngOnInit(){
  this.newAddressForm = this.fb.group({
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    postalCode: ['', [
      Validators.required,
      Validators.minLength(8), 
      Validators.maxLength(8)]]
  })
 }

  get fc(): { [key: string]: AbstractControl } {
    return this.newAddressForm.controls
  }

  filterCitiesOnChangeState(e: any){
    this.getStateId(e.target.value);
    this.filteredCity = this.cities.filter(x => x.state_id == this.selectedState.id)
  }

  getStateId(name: string){
    this.selectedState = this.states.find(x => x.name == name)
  }

  callNewAddressRoute():void{
    this.submitted = true

    if (this.newAddressForm.invalid) {
      this.isRegisterFailed = true;
      return;
    }

    let newAddress = this.newAddressForm.value;
    let userId = history.state.userId;
    
    this.createAddress(newAddress, userId).subscribe({
      next: (n) => {
        console.log(n)
        alert(n)
      },
      error: (e) => {
        console.log(e)
        this.errorMessage = e.error
      },
      complete: () => {
       setTimeout(() => {this.router.navigate([history.state.lastUrl])}, 2000);
      }
    })
  }

  clearFormResidues(){
    this.submitted = false
  }

  createAddress(address: any, userId: string):Observable<Address>{
    return this.userService.createAddress(address, userId);
  }
}
