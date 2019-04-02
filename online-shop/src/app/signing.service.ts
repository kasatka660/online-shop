import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./user";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SigningService {
  private usersUrl = 'api/users';  // URL to web api
  allUsers: User[];
  constructor( private http: HttpClient ) { }

  createUser(user: User) {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  checkUser(userToSearch: User) {
    this.http.get<User[]>(this.usersUrl)
      .subscribe( result => {
        this.allUsers = result;
        let userFound =  this.allUsers.find( user => user.email === userToSearch.email );
        console.log(userFound.password === userToSearch.password);
        let res = userFound.password === userToSearch.password;
        console.log(res);
        return res;
      });
  }
}


