import { Component, Input, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  state: any;
  user!: User;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private router: Router) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  @Input() id!:string
 
  editProfileForm = new FormGroup({
    email: new FormControl<string>(''),
    username: new FormControl<string>(''),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    telephone: new FormControl<string>('')
  })

  ngOnInit(){
    this.user = this.state.user
    this.editProfileForm = this.fb.group({
      email: this.user.email,
      username: this.user.username,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      telephone: this.user.telephone,
    })
    this.editProfileForm.get('username')?.disable()
  }

  editUserOnClick(){
    console.log(this.user)
    console.log(this.editProfileForm.value)
    
  }

  updateUser(user: any): Observable<User>{
    return this.userService.updateUser(user, this.id);
  }
}
