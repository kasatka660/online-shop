import { Component, OnInit } from '@angular/core';
import { ShopService } from "../../shop.service";
import {ShopItem} from "../../shop-item";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shopItems = [];
  arrayOfItems: ShopItem[];
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.shopService.getShopItems()
      .subscribe(items => {
        this.arrayOfItems = items;
        let k=4;
        for (let i = 0; i < this.arrayOfItems.length; i += k) {
          this.shopItems.push({ items: this.arrayOfItems.slice(i, i + k) });
        }
        console.log(this.shopItems);
      });
  }
}
