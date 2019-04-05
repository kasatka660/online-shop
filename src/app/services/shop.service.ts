import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

import {ShopItem} from "../models/shop-item.model";


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shopItemsUrl = 'api/shopItems';  // URL to web api
  @Output() cartChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(this.shopItemsUrl);
  }

  getShopItem(id: number): Observable<ShopItem> {
    const url = `${this.shopItemsUrl}/${id}`;
    return this.http.get<ShopItem>(url);
  }

  getItemsByKeys(ids) {
    return this.getShopItems()
      .pipe(
        map(item => {
          return item.filter(itemInfo => ids.includes(itemInfo.id.toString()));
        })
      )
  }

  updateCart() {
    const selectedItems = {...localStorage};
    const numberOfItems = Object.values(selectedItems).reduce( (prev, cur) =>  parseInt(prev) + parseInt(cur), 0  );
    this.cartChange.emit(numberOfItems)
  }
  getEmittedValue() {
    return this.cartChange;
  }

}

