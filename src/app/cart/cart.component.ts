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

  selectedItems = {...localStorage}
  selectedItemsKeys: string[]  =Object.keys(this.selectedItems);
  selectedItemsData: ShopItem[] = [] ;

  ngOnInit() {
    this.shopService.getItemsByKeys(this.selectedItemsKeys)
      .subscribe( result => {
        this.selectedItemsData = result.map( item => {
          item.quantity = this.selectedItems[item.id]
          return item;
        });
        console.log(this.selectedItemsData)
      })
  }

}
