import { Component, OnInit } from '@angular/core';

import {ShopService} from "../../services/shop.service";

import {CartItem} from "../../models/cart-item.model";

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
  total = 0;

  ngOnInit() {
    this.selectedItems = {...localStorage};
    this.selectedItemsKeys = Object.keys(this.selectedItems);

    this.shopService.getItemsByKeys(this.selectedItemsKeys)
      .subscribe( result => {
          const currentResult = result.map( item => {
            const newItem  = Object.assign( {quantity: +this.selectedItems[item.id]}, item )
            newItem.inStock = newItem.inStock - this.selectedItems[newItem.id];
            return newItem;
        });
          this.selectedItemsData = currentResult;
          this.selectedItemsData.map( item => this.total += item.price*item.quantity )
      })
  }

  removeFromCart(id) {
    localStorage.removeItem(id);
    this.shopService.updateCart();
    const index = this.selectedItemsData.findIndex( item => item.id = id );
    this.selectedItemsData.splice(index, 1);
  }

}