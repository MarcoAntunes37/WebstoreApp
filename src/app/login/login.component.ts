import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShowServerErrorPipe } from '../_customPipes/show-server-error.pipe';
import { NgIf, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, NgClass, RouterLink, ShowServerErrorPipe,
      MatFormFieldModule, MatButtonModule
    ]
})

export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private fb = inject(FormBuilder);
  private router = inject(Router)

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  })
  submitted = signal<boolean>(false);
  isLoggedIn = signal<boolean>(false);
  isLoginFailed = signal<boolean>(false);
  errorMessage = signal<string>('');  

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn.set(true);
      this.redirectHome();
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  
  onSubmit(): void {
    this.submitted.set(true)
    if (this.loginForm.invalid) {
      return;
    }
    this.apiCallLogin();
  }

  apiCallLogin(){
    const { username, password } = this.loginForm.value    
      this.authService.login(username!, password!).subscribe({
        next: (data) => {
          this.storageService.saveUser(data);
          this.isLoginFailed.set(true)
          this.isLoggedIn.set(true)
          this.reloadPage();
        },
        error: (err) => {
          this.errorMessage.set(err)
          console.log(err)
          this.isLoginFailed.set(true)
        }
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirectHome(){
    this.router.navigate(['home'])
  }
}