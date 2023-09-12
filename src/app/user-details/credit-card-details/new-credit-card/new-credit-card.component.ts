import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { Observable } from 'rxjs';
import { CreditCard } from './credit-card'
import { Router } from '@angular/router';
import { ShowServerErrorPipe } from '../../../_customPipes/show-server-error.pipe';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-new-credit-card',
    templateUrl: './new-credit-card.component.html',
    styleUrls: ['./new-credit-card.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, ShowServerErrorPipe]
})
export class NewCreditCardComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService);
  private router = inject(Router)
  submitted: boolean = false
  isRegisterfailed: boolean = false
  creditCardNetwork = signal<string>('') 
  errorMessage: string = ''
  newCreditCardForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(24)
    ]),
    number: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(16)
    ]),
    expirationDate: new FormControl<string>('', [
      Validators.required
    ]),
    cvv: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ])
  })

 ngOnInit(){
  this.newCreditCardForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(24)
    ]],
    number: ['', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(16)
    ]],
    expirationDate: ['', [
      Validators.required
    ]],
    cvv: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]]
  })
 }


 get fc(): {[key: string]:AbstractControl} {
  return this.newCreditCardForm.controls
}

  checkCardNetworkOnNumberChange(e: any){
  let masterCheck = e.target.value.substring(0,2);
  let othersCheck = masterCheck.substring(0,1);
  
   switch(masterCheck){
    case '51':
      this.creditCardNetwork.set('MasterCard')
       console.log(this.creditCardNetwork())
       break
    case '52': 
      this.creditCardNetwork.set('MasterCard')
      console.log(this.creditCardNetwork())
      break
    case '53':
      this.creditCardNetwork.set('MasterCard')
      console.log(this.creditCardNetwork())
      break
    case '54':
      this.creditCardNetwork.set('MasterCard')
      console.log(this.creditCardNetwork())
      break
    case '55':
      this.creditCardNetwork.set('MasterCard')
      console.log(this.creditCardNetwork())
      break
   }

   switch(othersCheck){
    case '4':
      this.creditCardNetwork.set('Visa')
      console.log(this.creditCardNetwork())
      break
    case '3':
      this.creditCardNetwork.set('Amex')
      console.log(this.creditCardNetwork())
      break
    case '':
      this.creditCardNetwork.set('')
      console.log(this.creditCardNetwork())
      break
   }
  }

clearFormResidues():void{
    this.submitted = false;
    this.creditCardNetwork.set('')
}

 callNewCreditCardRoute(){
  this.submitted = true

  if(this.newCreditCardForm.invalid){
    this.isRegisterfailed = true
    return;
  }

  let newCreditCard = this.newCreditCardForm.value
  let userId = history.state.userId
  let expirationDate = this.newCreditCardForm.value.expirationDate+'-01'  
  newCreditCard.expirationDate = expirationDate
  this.newCreditCard(newCreditCard, userId).subscribe({
    next: (n) =>{
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

 newCreditCard(creditCard: any, userId: string):Observable<CreditCard>{
  return this.userService.createCreditCard(creditCard, userId);
 }
}
