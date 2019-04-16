import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ShopService} from '../../services/shop.service';
import {CartService} from '../../services/cart.service';

import {CartItem} from '../../models/cart-item.model';
import { SelectedItem } from '../../models/selected-item.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  selectedItems: SelectedItem[];
  selectedItemsKeys: number[] = [] ;
  selectedItemsData: CartItem[] = [];
  total = 0;
  subscriptions: Subscription = new Subscription();

  constructor( private shopService: ShopService,
               private cartService: CartService) {
  }

  ngOnInit() {
    this.subscriptions.add(this.cartService.getItems()
      .subscribe( items =>  this.selectedItems = items )
    );
    if (this.selectedItems) {
      this.selectedItems.map( (item: SelectedItem) => this.selectedItemsKeys.push(item.id) );
      this.subscriptions.add(this.shopService.getItemsByKeys(this.selectedItemsKeys)
        .subscribe( result => {
          this.selectedItemsData = result.map(item => {
            const quantity = this.selectedItems.filter(a => a.id === item.id)[0].quantity;
            return Object.assign(  { quantity }, item );
          });
          this.selectedItemsData.map( item => this.total += item.price * item.quantity );
        })
      );
    }
  }

  removeFromCart(id) {
    this.cartService.removeItem(id);
    this.shopService.updateCart();
    const index = this.selectedItemsData.findIndex( item => item.id === id );
    this.selectedItemsData.splice(index, 1).map(item => this.total -= item.price * item.quantity);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
