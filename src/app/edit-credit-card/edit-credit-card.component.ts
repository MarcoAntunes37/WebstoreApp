import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { CreditCard } from '../_interfaces/CreditCard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-credit-card',
  templateUrl: './edit-credit-card.component.html',
  styleUrls: ['./edit-credit-card.component.css']
})
export class EditCreditCardComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  id!: string;
  creditCard!: CreditCard;
  editCreditCardForm = new FormGroup({
    name: new FormControl<string>(''),
    number: new FormControl<string>(''),
    expirationDate: new FormControl<Date>(new Date),
    cvv: new FormControl<string>('')
  })

  ngOnInit(){
    this.id = history.state.userId
    this.creditCard = history.state.creditCard
    this.editCreditCardForm = this.fb.group({
      name: this.creditCard.name,
      number: this.creditCard.number,
      expirationDate: this.creditCard.expirationDate,
      cvv: this.creditCard.cvv,
    })
  }

  editCreditCardOnClick(){
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
        console.log(n)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () =>{
        
      }
    })
  }

  updateCreditCard(creditCard: any, id: string): Observable<any>{
    return this.userService.updateCreditCard(creditCard, id);
  }
}
