import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ShopService } from "../../shop.service";
import { ShopItem } from "../../shop-item";

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  currentShopItem: ShopItem;
  constructor( private shopService: ShopService,
               private currentRoute: ActivatedRoute, ) { }

    ngOnInit(): void {
      this.getShopItem();
    }


    getShopItem() {
      const id = +this.currentRoute.snapshot.paramMap.get('id');
      console.log(id);
      this.shopService.getShopItem(id)
        .subscribe(item => {
          this.currentShopItem = item;
          console.log(this.currentShopItem) });
    }
}
