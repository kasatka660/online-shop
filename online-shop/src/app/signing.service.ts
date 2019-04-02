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
        map( item => console.log(item))
      )
  }
}


/*
checkUser(userToSearch: User) {
    return this.http.get<User[]>(this.usersUrl)
      .pipe( result => {
        this.allUsers = result;
        let userFound =  this.allUsers.find( user => user.email === userToSearch.email );
        if ( typeof userFound == 'undefined' ) {
          return false
        } else {
          return userFound.password === userToSearch.password;
        }
      });
  }


 */
