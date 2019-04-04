import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./user";
import { map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";

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
               private cookieService: CookieService ) { }

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
    this.cookieService.set('userName', '');
  }

  changeAuthorization() {
    this.authChange.emit(false);
  }

  getEmittedValue() {
    return this.authChange;
  }

}

