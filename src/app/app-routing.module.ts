import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewAddressComponent } from './user-details/address-details/new-address/new-address.component';
import { EditAddressComponent } from './user-details/address-details/edit-address/edit-address.component';
import { EditProfileComponent } from './user-details/profile-details/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './user-details/profile-details/change-password/change-password.component';
import { NewCreditCardComponent } from './user-details/credit-card-details/new-credit-card/new-credit-card.component';
import { EditCreditCardComponent } from './user-details/credit-card-details/edit-credit-card/edit-credit-card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  //product-list
  {path: 'home', component: WelcomeComponent},
  {path: 'products', 
    loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {path: 'product-details/:id', component: ProductDetailsComponent},
  
  //authentication
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  
  //profile
  {path: 'user-details/:username', component: UserDetailsComponent, pathMatch:'full'},
  {path: 'user-details/:username/edit-user', component: EditProfileComponent, pathMatch: 'full'},
  {path: 'user-details/:username/change-password', component: ChangePasswordComponent, pathMatch: 'full'},
  
  //address
  {path: 'user-details/:username/new-address', component:NewAddressComponent, pathMatch: 'full'},
  {path: 'user-details/:username/edit-address', component: EditAddressComponent, pathMatch: 'full'},

  //credit-card
  {path: 'user-details/:useranme/new-credit-card', component: NewCreditCardComponent, pathMatch: 'full'},
  {path: 'user-details/:username/edit-credit-card', component: EditCreditCardComponent, pathMatch: 'full'},

  //shopping-cart
  {path: ':username/shopping-cart', component: ShoppingCartComponent, pathMatch: 'full'},
  
  //wildcard
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
