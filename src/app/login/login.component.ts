import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { AbstractControl, 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
  submitted=false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';  

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
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
    this.submitted = true;    
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
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        error: (err) => {
          this.errorMessage = err.error
          console.log(err)
          this.isLoginFailed = true;
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