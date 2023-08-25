import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path: '', component: ProductListComponent },
  {
    path: 'home', component: ProductListComponent,    
  },
  {
    path: 'product-details/:id', 
    component: ProductDetailsComponent,
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-details/:username', component: UserDetailsComponent, pathMatch:'full'},
  {path: 'user-details/:username/edit-user', component: EditProfileComponent, pathMatch: 'full'},
  {path: 'user-details/:username/change-password', component: ChangePasswordComponent, pathMatch: 'full'},
  {path: 'user-details/:username/new-address', component:NewAddressComponent, pathMatch: 'full'},
  {path: 'edit-address/:id', component: EditAddressComponent, pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { bindToComponentInputs: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {  
  
 }
