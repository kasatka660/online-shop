import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import {ShopService} from './shop.service';


import { User } from '../models/user.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SigningService {

  private usersUrl = 'api/users';  // URL to web api

  @Output() authChange: EventEmitter<any> = new EventEmitter();

  constructor( private http: HttpClient,
               private cookieService: CookieService,
               private shopService: ShopService,
               private router: Router) { }

  createUser(user: User) {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  checkUser(userToSearch: User): Observable<boolean> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map( item => {
          const userFound = item.find( user => user.email === userToSearch.email);
          if ( typeof userFound === 'undefined' ) {
            return false;
          } else {
            this.cookieService.set( 'userName', `${userFound.email}` );
            return userFound.password === userToSearch.password;
          }
        })
      );
  }

  authorizeUser(email) {
    this.cookieService.set( 'userName', email );
    this.changeAuthorization();
  }

  isAuthorised(): boolean {
    return this.cookieService.check('userName');
  }

  signOut() {
    localStorage.clear();
    this.cookieService.delete('userName', '/');
    this.changeAuthorization();
    this.shopService.updateCart();
    this.router.navigate(['/home']);
  }

  changeAuthorization() {
    this.authChange.emit(this.isAuthorised());
  }

  getEmittedValue() {
    return this.authChange;
  }

}

