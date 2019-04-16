import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject: BehaviorSubject<any> = new BehaviorSubject([]);

  private cartItems = {};


  addItem( id, quantity) {
    this.cartItems[id] = quantity;
    this.subject.next( this.cartItems  );
  }

  removeItem( id ) {
    delete this.cartItems[id];
    this.subject.next(this.cartItems);
  }

  getItemQuantity( id ) {
    return this.subject.getValue()[id];
  }

  getItems(): Observable<any> {
    return this.subject.asObservable();
  }

}
