import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "../models/user.model";
import { map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import {ShopService} from "./shop.service";
import {Router} from "@angular/router";

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

  checkUser(userToSearch: User) {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map( item => {
          const userFound = item.find( user => user.email === userToSearch.email);
          if ( typeof userFound == 'undefined' ) {
            return false
          } else {
            this.cookieService.set( 'userName', `${userFound.email}` );
            return userFound.password === userToSearch.password;
          }
        })
      )
  }

  isAuthorised() {
    return this.cookieService.get('userName').length > 0;
  }

  signOut() {
    localStorage.clear();
    this.cookieService.set('userName', '');
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
