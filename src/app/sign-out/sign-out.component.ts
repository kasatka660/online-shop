import { Component, OnInit } from '@angular/core';
import {SigningService} from "../signing.service";
import {Router} from "@angular/router";
import {ShopService} from "../shop.service";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor( private signingService: SigningService,
               private shopService: ShopService,
               private router: Router) { }

  ngOnInit() {

  }

  signOut() {
    this.signingService.signOut();
  }
  goBack() {
    this.router.navigate(['/shop']);
  }
}
