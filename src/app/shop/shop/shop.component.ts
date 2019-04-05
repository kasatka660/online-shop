import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import { ShopService } from "../../services/shop.service";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  shopItems = [];
  p: number = 1;
  subscriptions: Subscription = new Subscription();

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.subscriptions.add(this.shopService.getShopItems()
      .subscribe(items => {
        this.shopItems = items;
      })
   );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
