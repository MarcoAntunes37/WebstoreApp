import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  state: any;
  changePasswordForm= new FormGroup({
    password: new FormControl<string>(''),
    newPassword: new FormControl<string>(''),
    confirmPassword: new FormControl<string>('')
  })

  constructor(router: Router){
    this.state = router.getCurrentNavigation()?.extras.state;
  }
  
  
  ngOnInit(){
    this.changePasswordForm = this.fb.group({
      password: '',
      newPassword: '',
      confirmPassword: ''
    })
    console.log(this.state.id)
  }

    changePasswordOnClick(){
      console.log(this.changePasswordForm.value)
    }

    updatePassword(user: any, id: string): Observable<any>{
      return this.userService.updateUserPassword(user, id);
    }
}
