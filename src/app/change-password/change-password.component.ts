import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { UserChangePassword } from '../_interfaces/UserChangePassword';

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
  }

    changePasswordOnClick(){
      const {password, newPassword, confirmPassword} = this.changePasswordForm.value
      this.updatePassword(password!, newPassword!, confirmPassword!, this.state.id).subscribe(
        {
          next: (n) => {
            console.log(n);
          },
          error: (e) => {
            console.log(e)
          },
          complete: () => {
            
          }
        }
      )
    }
    
    updatePassword(password: string, newPassword: string, confirmPassword: string, id: string): Observable<any>{
      let user: UserChangePassword = {
        password: password,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }
      return this.userService.updateUserPassword(user, id);
    }
}
