import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ShopService} from '../../services/shop.service';

import {CartItem} from '../../models/cart-item.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor( private shopService: ShopService ) { }

  selectedItems = {};
  selectedItemsKeys: string[] ;
  selectedItemsData: CartItem[] = [] ;
  total = 0;
  subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.selectedItems = {...localStorage};
    this.selectedItemsKeys = Object.keys(this.selectedItems);

    this.subscriptions.add(this.shopService.getItemsByKeys(this.selectedItemsKeys)
      .subscribe( result => {
        this.selectedItemsData = result.map(item => {
            return Object.assign({quantity: +this.selectedItems[item.id]}, item);
          });
        this.selectedItemsData.map( item => this.total += item.price * item.quantity );
      })
    );
  }

  removeFromCart(id) {
    localStorage.removeItem(id);
    this.shopService.updateCart();
    const index = this.selectedItemsData.findIndex( item => item.id = id );
    this.selectedItemsData.splice(index, 1).map(item => this.total -= item.price * item.quantity);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
