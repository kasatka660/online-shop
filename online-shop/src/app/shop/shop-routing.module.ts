import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";

import {ShopComponent } from "./shop/shop.component";
import { ShopItemComponent } from "./shop-item/shop-item.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'shop', component: ShopComponent },
      { path: 'shop-item/:id', component: ShopItemComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class ShopRoutingModule { }
