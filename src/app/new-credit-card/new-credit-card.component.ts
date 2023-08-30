import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { CreditCard } from '../_interfaces/CreditCard';

@Component({
  selector: 'app-new-credit-card',
  templateUrl: './new-credit-card.component.html',
  styleUrls: ['./new-credit-card.component.css']
})
export class NewCreditCardComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService);
  newCreditCardForm = new FormGroup({
    name: new FormControl<string>(''),
    number: new FormControl<string>(''),
    expirationDate: new FormControl<string>(''),
    cvv: new FormControl<string>('')
  })

 ngOnInit(){
  this.newCreditCardForm = this.fb.group({
    name: [''],
    number: [''],
    expirationDate: [''],
    cvv: ['']
  })
 }

 callNewCreditCardRoute(){
  let newCreditCard = this.newCreditCardForm.value
  let userId = history.state.userId
  this.newCreditCard(newCreditCard, userId).subscribe({
    next: (n) =>{
      console.log(n)
    },
    error: (e) => {
      console.log(e)
    },
    complete: () => {

    }
  })
 }


 newCreditCard(creditCard: any, userId: string):Observable<CreditCard>{
  return this.userService.createCreditCard(creditCard, userId);
 }
}
