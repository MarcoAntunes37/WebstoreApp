import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent {
  private fb = inject(FormBuilder)
  @Input() address!: any[];
  editAddressForm = new FormGroup({
    street: new FormControl<string>(''),
    city: new FormControl<string>(''),
    state: new FormControl<string>(''),
    country: new FormControl<string>(''),
    postalCode: new FormControl<string>('')
  })

  ngInit(){
   this.editAddressForm = this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: ['']
    })
  }
}
