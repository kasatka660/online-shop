import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {ShopItem} from '../models/shop-item.model';
import {CartService} from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  subscriptions: Subscription = new Subscription();
  selectedItems;

  private shopItemsUrl = 'api/shopItems';  // URL to web api
  @Output() cartChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient,
              private cartService: CartService) { }

  getShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(this.shopItemsUrl);
  }

  getShopItem(id: number): Observable<ShopItem> {
    const url = `${this.shopItemsUrl}/${id}`;
    return this.http.get<ShopItem>(url);
  }

  getItemsByKeys(ids): Observable<ShopItem[]> {
    return this.getShopItems()
      .pipe(
        map(item => {
          return item.filter(itemInfo => ids.includes(itemInfo.id.toString()));
        })
      );
  }

  updateCart() {
    this.subscriptions.add( this.cartService.getItems().subscribe( items => this.selectedItems = items ) );
    if (this.selectedItems) {
      console.log(this.selectedItems);
      const numberOfItems = Object.values(this.selectedItems).reduce((prev, cur) =>  prev + cur, 0);
      this.cartChange.emit(numberOfItems);
    }
  }

  getEmittedValue() {
    return this.cartChange;
  }

}

