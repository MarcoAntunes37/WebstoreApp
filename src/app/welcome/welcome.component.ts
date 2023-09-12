import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  template: `
  <div class="welcome-container">
    <h1 class="welcome-heading">Welcome to {{title}}</h1>
    <p class="welcome-text">You can see our products by click in button below.</p>
    <button routerLink="/products" mat-raised-button color="primary">
      Get Started
    </button>
  </div>`,
  styles: [`
    .welcome-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 50vw;
    }
  `],
  standalone: true,
  imports: [RouterLink, MatButtonModule]
})
export class WelcomeComponent {
  title = 'Web Store App'
}
