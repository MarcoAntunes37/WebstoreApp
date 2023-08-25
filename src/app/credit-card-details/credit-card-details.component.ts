import { Component, Input, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css']
})
export class CreditCardDetailsComponent {
  private fb = inject(FormBuilder); 
  isCreditCardEditable = signal<boolean>(false)
  updateCreditCardForm = new FormGroup({
    name: new FormControl<string>(''),
    number: new FormControl<string>(''),
    expirationDate: new FormControl<Date>(new Date()),
    cvv: new FormControl<string>('')
  })
  @Input() creditCards!: any[];

  ngInit(){

  }  

  changeCreditCardEditable(){
    this.isCreditCardEditable.set(!this.isCreditCardEditable())
  }
  
  newCreditCard(){
    console.log("new credit card")
  }
  
  deleteCreditCard(id: string){
    console.log("delete credit card" +id)
  }
}
