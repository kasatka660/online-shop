import {Injectable, Output, EventEmitter} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ShopItem } from "./shop-item";
import { CartItem } from "./cart-item"
import {map} from "rxjs/operators";


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
          const selectedItems = [];
          for ( let i=0; i < ids.length; i++) {
            let newItem = item.find( itemInfo => itemInfo.id == ids[i] );
           console.log(newItem);
            selectedItems.push(newItem)
          }
         console.log(selectedItems);
          return selectedItems;
        })
      )
  }

  changeCart() {
    const selectedItems = {...localStorage};
    const numberOfItems = Object.values(selectedItems).reduce( (prev, cur) => parseInt(prev) + parseInt(cur) );
    this.cartChange.emit(numberOfItems)
  }
  getEmittedValue() {
    return this.cartChange;
  }



}

