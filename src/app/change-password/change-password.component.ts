import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { UserChangePassword } from '../_interfaces/UserChangePassword';
import { PasswordValidators } from '../_customValidators/PasswordValidators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)
  submitted: boolean = false
  errorMessage: string = ''
  isUpdateFailed: boolean = false
  changePasswordForm= new FormGroup({
    password: new FormControl<string>('', [
      Validators.required,
    ]),
    newPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      PasswordValidators.strength
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),      
    ])
  }) 
  
  ngOnInit(){
    this.changePasswordForm = this.fb.group({
      password: ['', [
        Validators.required
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        PasswordValidators.strength
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]]
    },
    {
       validators: [PasswordValidators.match('newPassword', 'confirmPassword')],
    })
  }

  get fc():{[key:string]: AbstractControl}{
    return this.changePasswordForm.controls
  }

  changePasswordOnClick(){
    this.submitted = true

    if(this.changePasswordForm.invalid){
      this.isUpdateFailed = true;
      return;
    }

    const {password, newPassword, confirmPassword} = this.changePasswordForm.value
    this.updatePassword(password!, newPassword!, confirmPassword!, history.state.id).subscribe(
      {
        next: (n) => {
          alert(n)
          console.log(n);
        },
        error: (e) => {
          this.errorMessage = e.error
          console.log(e)
        },
        complete: () => {
          setTimeout(() => {this.router.navigate([history.state.lastUrl])}, 2000);
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
