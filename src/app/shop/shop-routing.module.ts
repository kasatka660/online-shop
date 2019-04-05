import { NgModule } from '@angular/core';
import { RouterModule} from "@angular/router";

import {ShopComponent } from "./shop/shop.component";
import { ShopItemComponent } from "./shop-item/shop-item.component";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'shop', component: ShopComponent },
      { path: 'shop-item/:id', component: ShopItemComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class ShopRoutingModule { }
