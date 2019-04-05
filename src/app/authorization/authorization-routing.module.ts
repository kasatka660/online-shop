import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SignOutComponent } from "./sign-out/sign-out.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'sign-out', component: SignOutComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class AuthorizationRoutingModule { }
