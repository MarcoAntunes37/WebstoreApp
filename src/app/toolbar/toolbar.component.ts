import { Component, Input, inject } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
    standalone: true,
    imports: [RouterLink, MatIconModule, NgIf]
})

export class ToolbarComponent {
private storageService = inject(StorageService) 
@Input() username?:string;
isLoggedIn: any;
@Input() role?:string;
 
 ngOnInit(){
  if(this.username){
    this.isLoggedIn = true;
    console.log(this.username)
  }
 }

 logout(){
    this.storageService.clean();
    window.location.reload();
  }
}
