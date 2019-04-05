import { NgModule } from '@angular/core';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class AuthorizationModule { }
