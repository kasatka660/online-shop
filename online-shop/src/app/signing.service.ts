import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./user";
import {tap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SigningService {
  private usersInfoUrl = 'api/usersInfo';  // URL to web api
  constructor( private http: HttpClient ) { }

  createUser(user: User) {
    return this.http.post<User>(this.usersInfoUrl, user, httpOptions)
      .pipe(
        tap((newUser: User) => console.log(newUser))
      );
  }
}

