import { Component, Input, inject } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {
private storageService = inject(StorageService) 
@Input() username?:string;
@Input() isLoggedIn?:boolean;
@Input() role?:string;
 
 ngOnInit(){
  if(this.username){
    this.isLoggedIn = true;
  }
 }

 logout(){
    this.storageService.clean();
    window.location.reload();
  }
}
