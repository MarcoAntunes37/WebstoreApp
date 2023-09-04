import { Component, Input, inject} from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {
  private router = inject(Router)
  @Input() id!: string;
  @Input() username!:string;
  @Input() email!:string;
  @Input() firstName!:string;
  @Input() lastName!:string;
  @Input() telephone!:string;

  callEditPasswordRoute(){
    this.router.navigate(
      ['user-details/'+this.username+'/change-password'],{
        state: {
          id: this.id,
          lastUrl: this.router.url
        }
      }
    )
  }
  
  callEditUserRoute(){    
    this.router.navigate(
      ['user-details/'+this.username+'/edit-user/'], {
        state: { 
          user: {
            id: this.id,
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            telephone: this.telephone
          },
          lastUrl: this.router.url
        }
      }
    )
  }
}
