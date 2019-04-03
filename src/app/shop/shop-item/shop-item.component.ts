import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ShopService } from "../../shop.service";
import { ShopItem } from "../../shop-item";
import {SigningService} from "../../signing.service";

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  currentShopItem: ShopItem;
  quantity = 1;
  isAuthorised: boolean;
  buttonsDisabling: boolean;

  constructor( private shopService: ShopService,
               private currentRoute: ActivatedRoute,
               private signingService: SigningService) { }

  ngOnInit(): void {
    this.getShopItem();
    this.isAuthorised = this.signingService.isAuthorised();
    this.buttonsDisabling = !this.isAuthorised;
  }

  getShopItem() {
    const id = +this.currentRoute.snapshot.paramMap.get('id');
    this.shopService.getShopItem(id)
      .subscribe(item => {
        this.currentShopItem = item;
      });
  }

  addToCart() {
    localStorage.setItem( `${this.currentShopItem.id}`, `${this.quantity}`);
  }

  increase() {
    this.quantity +=1;
  }
  decrease() {
    if (this.quantity === 1) {
      return;
    } else {
      this.quantity -=1;
    }
  }

}
