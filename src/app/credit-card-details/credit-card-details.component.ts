import { Component, Input, inject, signal } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css']
})
export class CreditCardDetailsComponent {
  @Input() creditCards!: any[]
  @Input() userId!: string
  @Input() username!: string
  private userService = inject(UserService)
  selectedCreditCard!: any;
  router = inject(Router)

  callNewCreditCardRoute(){
    this.router.navigate(['user-details/'+this.username+'/new-credit-card'], 
    {
      state: { 
        userId: this.userId 
      }
    })
  }

  callEditCreditCardRoute(creditCard: any){
    this.selectedCreditCard = creditCard
    this.router.navigate(['user-details/'+this.username+'/edit-credit-card'],
    {
      state: {
        userId: this.userId,
        creditCard: this.selectedCreditCard,
      }
    })
  }

  callDeleteCreditCardRoute(id: string){
    this.deleteCreditCard(id, this.userId).subscribe({
      next: (n) => {
        console.log(n)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {

      }
    })
  }

  deleteCreditCard(id: string, userId: string): Observable<any>{
    return this.userService.deleteCreditCard(id, userId);
  }
}
