import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { Address } from '../../_interfaces/Address';
import { Observable } from 'rxjs';
import data from '../../../assets/forms-data/estados-cidades2.json'
import { ShowServerErrorPipe } from '../../_customPipes/show-server-error.pipe';
import { NgClass, NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, ShowServerErrorPipe]
})
export class EditAddressComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)
  states = data.states
  selectedState: any;
  filteredCity: any;
  cities = data.cities
  isUpdateFailed = false;
  errorMessage = '';
  submitted = false; 
  id!: string;
  address!: Address;
  editAddressForm = new FormGroup({
    street: new FormControl<string>('', [ Validators.required ]),
    city: new FormControl<string>('', [ Validators.required ]),
    state: new FormControl<string>('', [ Validators.required ]),
    country: new FormControl<string>('', [ Validators.required ]),
    postalCode: new FormControl<string>('', [ 
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8) 
    ])
  })

  ngOnInit(){
    this.id = history.state.userId
    this.address = history.state.address
    this.editAddressForm = this.fb.group({
      street: [this.address.street, [ Validators.required ]],
      city: [this.address.city, [ Validators.required ]],
      state: [this.address.state, [ Validators.required ]],
      country: [this.address.country, [ Validators.required ]],
      postalCode: [this.address.postalCode, [ 
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(8)
      ]]
    })
  }

  get fc(): {[key: string]:AbstractControl}{
    return this.editAddressForm.controls
  }

  filterCitiesOnChangeState(e: any){
    this.getStateId(e.target.value);
    this.filteredCity = this.cities.filter(x => x.state_id == this.selectedState.id)
 }

  getStateId(name: string){
    this.selectedState = this.states.find(x => x.name == name)
  }

  clearFormResidues(){
    this.submitted = false
  }
  editAddressOnClick(): void{
    this.submitted = true

    if (this.editAddressForm.invalid) {
      this.isUpdateFailed = true;
      return;
    }

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
        alert(n)
      },
      error: (e) => {
        console.log(e)
        this.errorMessage = e.error
      },
      complete: () =>{
        setTimeout(() => {this.router.navigate([history.state.lastUrl])}, 2000);
      }
    })
  }

  updateAddress(address: any, id: string): Observable<any>{
    return this.userService.updateAddress(address, id);
  }
}
