import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject: BehaviorSubject<any> = new BehaviorSubject([]);

  addItem( id, quantity ) {
    const tempStorage = this.subject.getValue();
    const index = tempStorage.findIndex( item => item.id === id );
    if ( index >= 0 ) {
      tempStorage[index].quantity += quantity;
    } else {
      tempStorage.push( { id, quantity } );
    }
    this.subject.next( tempStorage ) ;
  }

  removeItem( id ) {
    const tempStorage = this.subject.getValue();
    const index = tempStorage.findIndex( item => item.id === id) ;
    tempStorage.splice(index, 1);
    this.subject.next( tempStorage );
  }

  getItemQuantity( id ) {
    return this.subject.getValue()[id];
  }

  getItems(): Observable<any> {
    return this.subject.asObservable();
  }

}
