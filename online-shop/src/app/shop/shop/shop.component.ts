import { Component, OnInit } from '@angular/core';
import { ShopService } from "../../shop.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shopItems = [];
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.shopService.getShopItems()
      .subscribe(items => {
        this.shopItems = items;
      });
  }
}
