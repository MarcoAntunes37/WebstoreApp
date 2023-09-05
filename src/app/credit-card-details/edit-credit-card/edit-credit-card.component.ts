import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { CreditCard } from '../../_interfaces/CreditCard';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShowServerErrorPipe } from '../../_customPipes/show-server-error.pipe';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-edit-credit-card',
    templateUrl: './edit-credit-card.component.html',
    styleUrls: ['./edit-credit-card.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, ShowServerErrorPipe]
})
export class EditCreditCardComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)
  submitted: boolean = false
  creditCardNetwork = signal<string>('')
  isUpdateFailed: boolean = false
  errorMessage: string = ''
  id!: string;
  creditCard!: CreditCard;
  editCreditCardForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(24)
    ]),
    number: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(16) 
    ]),

    expirationDate: new FormControl<Date>(new Date, [
      Validators.required
    ]),
    cvv: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ])
  })

  ngOnInit(){
    this.id = history.state.userId
    this.creditCard = history.state.creditCard
    this.editCreditCardForm = this.fb.group({
      name: [this.creditCard.name, [
        Validators.required,
        Validators.maxLength(24)
      ]],
      number: [this.creditCard.number, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(16)
      ]],
      expirationDate: [this.creditCard.expirationDate, [
        Validators.required
      ]],
      cvv: [this.creditCard.cvv, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]],
    })
  }

  get fc(): {[key: string]:AbstractControl} {
    return this.editCreditCardForm.controls
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

  editCreditCardOnClick(){
    this.submitted = true

    if(this.editCreditCardForm.invalid){
      this.isUpdateFailed = true
      return;
    }

    const {name, number, expirationDate, cvv} = this.editCreditCardForm.value

    let creditCardUpdate = {
      id: this.creditCard.id,
      name: name,
      number: number,
      expirationDate: expirationDate,
      cvv: cvv,
    }

    this.updateCreditCard(creditCardUpdate, this.id).subscribe({
      next: (n) =>{
        alert(n)
        console.log(n)
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

  clearFormResidues(): void{
    this.submitted = false
    this.creditCardNetwork.set('')
  }

  updateCreditCard(creditCard: any, id: string): Observable<any>{
    return this.userService.updateCreditCard(creditCard, id);
  }
}
