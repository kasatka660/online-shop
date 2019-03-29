import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { ShopItem } from "./shop-item";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shopItemsUrl = 'api/shopItems';  // URL to web api

  constructor(private http: HttpClient) { }

  getShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(this.shopItemsUrl);
  }

  getShopItem(id: number): Observable<ShopItem> {
    const url = `${this.shopItemsUrl}/${id}`;
    return this.http.get<ShopItem>(url)
  }
}
