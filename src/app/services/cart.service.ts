import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>();

  addItem( id, quantity) {
    this.subject.next( { id, quantity } );
  }

  removeItem( id ) {
    this.subject.next();
  }

  getItems(): Observable<any> {
    return this.subject.asObservable();
  }

}
