import { Component, OnInit } from '@angular/core';
import {ShopService} from "../shop.service";
import {ShopItem} from "../shop-item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( private shopService: ShopService ) { }
  itemsKeys: string[];
  selectedItemsData: ShopItem[];

  getCartInfo() {
     const items = {...localStorage};
     this.itemsKeys = Object.keys(items);
     //console.log(this.itemsKeys)
  }

  ngOnInit() {
    this.getCartInfo();
    this.shopService.getItemsByKeys(this.itemsKeys)
      .subscribe( result => {
        this.selectedItemsData = result;
      })
  }

}
