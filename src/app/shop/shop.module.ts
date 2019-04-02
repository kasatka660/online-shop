import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ShopComponent} from "./shop/shop.component";
import {ShopItemComponent} from "./shop-item/shop-item.component";

import {ShopRoutingModule} from "./shop-routing.module";


@NgModule({
  declarations: [
    ShopComponent,
    ShopItemComponent
  ],
  imports: [
    BrowserModule,
    ShopRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ShopModule { }
