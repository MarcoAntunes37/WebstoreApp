import { Component, Input, inject } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
    standalone: true,
    imports: [
      RouterLink, MatIconModule, NgIf, MatButtonModule, MatMenuModule, MatToolbarModule,
      MatFormFieldModule, MatInputModule
    ]
})

export class ToolbarComponent {
title = "Web store app"
isActive = true;
private storageService = inject(StorageService) 
@Input() username?:string;
@Input() isLoggedIn?:boolean;
@Input() role?:string;
 
 ngOnInit(){
  if(this.username){
    this.isLoggedIn = true;
  }
 }

 toggle(){
  this.isActive = !this.isActive
 }

 logout(){
    this.storageService.clean();
    window.location.reload();
  }
}
