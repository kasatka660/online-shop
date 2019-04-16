import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';

import { ShopItem } from '../../models/shop-item.model';

import { ShopService } from '../../services/shop.service';
import {SigningService} from '../../services/signing.service';
import {CartService} from '../../services/cart.service';


@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit, OnDestroy {
  currentShopItem: ShopItem;
  quantity = 1;
  isAuthorised: boolean;
  buttonsDisabling: boolean;
  subscriptions: Subscription = new Subscription();

  constructor( private shopService: ShopService,
               private currentRoute: ActivatedRoute,
               private signingService: SigningService,
               private cartService: CartService) { }

  ngOnInit()  {
    this.getShopItem();
    this.isAuthorised = this.signingService.isAuthorised();
    this.buttonsDisabling = !this.isAuthorised;
  }

  getShopItem() {
    const id = +this.currentRoute.snapshot.paramMap.get('id');
    this.subscriptions.add(this.shopService.getShopItem(id)
      .subscribe(item => {
        this.currentShopItem = item;
      })
    );
  }

  addToCart() {
    const prevQuantity = this.cartService.getItemQuantity(`${this.currentShopItem.id}`) || 0;
    const id = this.currentShopItem.id.toString();
    const quantityAdded =  Number(prevQuantity) + this.quantity;
    this.cartService.addItem( id, quantityAdded );
    this.shopService.updateCart();
  }

  increase() {
    this.quantity += 1;
  }

  decrease() {
    if (this.quantity === 1) {
      return;
    } else {
      this.quantity -= 1;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
