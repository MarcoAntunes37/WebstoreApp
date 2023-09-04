import { Component, Input, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { User } from '../_interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router)
  isUpdateFailed: boolean = false
  submitted: boolean = false
  errorMessage: string = ''
  user!: User;
  @Input() id!:string
 
  editProfileForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    username: new FormControl<string>('', [
      Validators.required
    ]),
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    telephone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ])
  })

  ngOnInit(){
    this.user = history.state.user
    this.editProfileForm = this.fb.group({
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      username: [this.user.username, [
        Validators.required
      ]],
      firstName: [this.user.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      lastName: [this.user.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      telephone: [this.user.telephone,[
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]],
    })
    this.editProfileForm.get('username')?.disable()
  }

  get fc(): {[key: string]:AbstractControl}{
    return this.editProfileForm.controls
  }

  editUserOnClick(){
    this.submitted = true

    if(this.editProfileForm.invalid){
      this.isUpdateFailed = true;
      return;
    }

    const userDto: any = {
      firstName: this.editProfileForm.value.firstName,
      lastName: this.editProfileForm.value.lastName,
      username: this.editProfileForm.value.username,
      email: this.editProfileForm.value.email,
      telephone: this.editProfileForm.value.telephone,
    }
    
    this.updateUser(userDto).subscribe({
      next: (n) => {
        alert(n)
        console.log(n)
      },
      error: (e) => {
        console.log(e)
        this.errorMessage = e.error
      },
      complete: () => {
        let url = history.state.lastUrl
        setTimeout(() => {this.router.navigate([url])}, 2000);
      }
    })
    
  }

  updateUser(user: any): Observable<User>{
    return this.userService.updateUser(user, this.user.id);
  }
}
