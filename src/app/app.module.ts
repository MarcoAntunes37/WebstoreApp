import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { NewCreditCardComponent } from './new-credit-card/new-credit-card.component';
import { EditCreditCardComponent } from './edit-credit-card/edit-credit-card.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HideAllNumbersPipe } from './_customPipes/hide-all-numbers.pipe';
import { HideCreditCardNumbersPipe } from './_customPipes/hide-credit-card-numbers.pipe';
import { ShowServerErrorPipe } from './_customPipes/show-server-error.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    FooterComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ProductDetailsComponent,
    ProfileDetailsComponent,
    UserDetailsComponent,
    AddressDetailsComponent,
    CreditCardDetailsComponent,
    NewAddressComponent,
    EditAddressComponent,
    NewCreditCardComponent,
    EditCreditCardComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    HideAllNumbersPipe,
    HideCreditCardNumbersPipe,
    ShowServerErrorPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
