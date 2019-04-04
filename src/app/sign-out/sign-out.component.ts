import { Component, OnInit } from '@angular/core';
import {SigningService} from "../signing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor( private signingService: SigningService,
               private router: Router) { }

  ngOnInit() {

  }

  signOut() {
    localStorage.clear();
    this.signingService.signOut();
    this.router.navigate(['/home']);
    this.signingService.changeAuthorization();
  }
  goBack() {
    this.router.navigate(['/shop']);
  }
}
