import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {CartComponent} from "./cart/cart.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'my-cart', component: CartComponent},
    ])
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
