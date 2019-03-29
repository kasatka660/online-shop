import { Component, OnInit } from '@angular/core';
import { ShopService } from "../../shop.service";
import {ShopItem} from "../../shop-item";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shopItems: ShopItem[] = [];
  numberOfRows: number;
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.shopService.getShopItems()
      .subscribe(items => {
        this.shopItems = items;
        this.numberOfRows = Math.ceil(this.shopItems.length /4);
        console.log(this.numberOfRows);
      });
  }
}
