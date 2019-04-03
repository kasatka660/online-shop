import { Component, OnInit } from '@angular/core';
import {SigningService} from "../signing.service";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor( private signingService: SigningService ) { }

  ngOnInit() {

  }

  signOut() {
    localStorage.clear();
    this.signingService.signOut();
    window.location.href = 'home';
  }
  goBack() {
    window.location.href = 'shop';
  }
}
