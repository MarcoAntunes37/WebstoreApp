import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    template: `
    <mat-toolbar color="primary" class="footer">
        <div class="footer-content">
            <span>&copy; 2023 {{title}}</span>
        </div>
    </mat-toolbar>`,
    styles: [`
        mat-toolbar{
            display: flex;
            justify-content: center
        }
    `],
    standalone: true,
    imports: [RouterLink, MatToolbarModule]
})
export class FooterComponent {
    title='WebStoreApp'
}
