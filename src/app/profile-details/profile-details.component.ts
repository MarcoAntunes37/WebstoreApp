import { Component, Input, inject, signal } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../_interfaces/User';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {
  private fb = inject(FormBuilder)
  @Input() username!:string;
  @Input() email!:string;
  @Input() firstName!:string;
  @Input() lastName!:string;
  @Input() telephone!:string;
  isUserEditable = signal<boolean>(false);

  updateUserForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    telephone: new FormControl<string>(''),
  })

  ngOnInit(){
    this.updateUserForm = this.fb.group({
        firstName: [''],
        lastName: [''],
        telephone: ['']
    })
  }
  get fc(): { [key: string]: AbstractControl } {
    return this.updateUserForm.controls;
  }
  changeUserEditable(){
    this.isUserEditable.set(!this.isUserEditable())
  }
}
