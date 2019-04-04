import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ShopComponent} from "./shop/shop.component";
import {ShopItemComponent} from "./shop-item/shop-item.component";

import {ShopRoutingModule} from "./shop-routing.module";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    ShopComponent,
    ShopItemComponent
  ],
  imports: [
    BrowserModule,
    ShopRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: []
})
export class ShopModule { }
