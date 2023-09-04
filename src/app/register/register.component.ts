import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { PasswordValidators } from '../_customValidators/PasswordValidators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../reset.css']
})

export class RegisterComponent implements OnInit{
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    telephone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      PasswordValidators.strength
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ])
  })  
  isRegisterFailed = false;
  errorMessage = '';
  submitted = false; 

  get fc(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  ngOnInit():void{
   this.registerForm = this.fb.group({
      firstName: ['', 
        [ Validators.required, 
        Validators.minLength(3) ]
      ],
      lastName: ['', 
        [Validators.required,
        Validators.minLength(3)]
      ],
      telephone: ['', 
        [ Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11) ]
      ],
      email: ['', 
        [Validators.required,
        Validators.email]
      ],
      username: ['', 
        [ Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20) ]
      ],
      password: ['',
      [ Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        PasswordValidators.strength ]
      ],
      confirmPassword: ['', 
      [ Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30), ]
      ],
    },
    {
       validators: [PasswordValidators.match('password', 'confirmPassword')],
    })
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      this.isRegisterFailed = true;
      return;
    }
    
    this.userService.createUser(this.registerForm.value!).subscribe({
     next: (result) => {
        console.log(result)
        alert(result)
      },
     error: (err) => {
      console.log(err.error)
      this.errorMessage = err.error   
      },
     complete: () => {
      setTimeout(()=>this.router.navigate(['home']), 2000);}     
    })
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}