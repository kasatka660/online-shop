import { Component, OnInit } from '@angular/core';
import {ShopService} from "../shop.service";
import {CartItem} from "../cart-item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( private shopService: ShopService ) { }

  selectedItems = {};
  selectedItemsKeys: string[] ;
  selectedItemsData: CartItem[] = [] ;

  ngOnInit() {
    this.selectedItems = {...localStorage};
    this.selectedItemsKeys = Object.keys(this.selectedItems);

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
