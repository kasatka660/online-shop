import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./user";
import { map, find } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SigningService {
  private usersUrl = 'api/users';  // URL to web api
 // allUsers: User[];
  constructor( private http: HttpClient ) { }

  createUser(user: User) {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  checkUser(userToSearch: User) {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map( item => {
          const userFound = item.find( user => user.email === userToSearch.email);
          //console.log(userFound)
          if ( typeof userFound == 'undefined' ) {
           // console.log(typeof userFound);
            return false
          } else {
           // console.log(userFound.password === userToSearch.password)
            return userFound.password === userToSearch.password;
          }
        })
      )
  }
}

