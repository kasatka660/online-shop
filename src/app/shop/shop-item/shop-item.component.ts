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
  quantity = 1;

  constructor( private shopService: ShopService,
               private currentRoute: ActivatedRoute, ) { }

    ngOnInit(): void {
      this.getShopItem();
    }

    getShopItem() {
      const id = +this.currentRoute.snapshot.paramMap.get('id');
      this.shopService.getShopItem(id)
        .subscribe(item => {
          this.currentShopItem = item;
          console.log(this.currentShopItem) });
    }

  addToCart() {
    localStorage.setItem( `${this.currentShopItem.id}`, `${this.quantity}`);
  }

  increase() {
    this.quantity +=1;
  }
  decrease() {
      if (this.quantity === 0) {
        return;
      } else {
        this.quantity -=1;
      }

  }
}
