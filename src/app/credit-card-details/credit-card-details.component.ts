import { Component, Input, inject } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HideAllNumbersPipe } from '../_customPipes/hide-all-numbers.pipe';
import { HideCreditCardNumbersPipe } from '../_customPipes/hide-credit-card-numbers.pipe';
import { NgFor, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-credit-card-details',
    templateUrl: './credit-card-details.component.html',
    styleUrls: ['./credit-card-details.component.css'],
    standalone: true,
    imports: [MatIconModule, NgFor, DatePipe, HideAllNumbersPipe, HideCreditCardNumbersPipe]
})
export class CreditCardDetailsComponent {
  @Input() creditCards!: any[]
  @Input() userId!: string
  @Input() username!: string
  private userService = inject(UserService)
  private router = inject(Router)
  selectedCreditCard!: any;
  

  callNewCreditCardRoute(){
    this.router.navigate(['user-details/'+this.username+'/new-credit-card'], 
    {
      state: { 
        userId: this.userId,
        lastUrl: this.router.url
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
        lastUrl: this.router.url
      }
    })
  }

  callDeleteCreditCardRoute(id: string){
    this.deleteCreditCard(id, this.userId).subscribe({
      next: (n) => {
        console.log(n)
        alert(n)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        window.location.reload()
      }
    })
  }

  deleteCreditCard(id: string, userId: string): Observable<any>{
    return this.userService.deleteCreditCard(id, userId);
  }
}
