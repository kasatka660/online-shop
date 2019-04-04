import { Component, OnInit } from '@angular/core';
import {SigningService} from "../signing.service";
import {ShopService} from "../shop.service";
import {subscribeOn} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private signingService: SigningService,
               private shopService: ShopService) { }

  isAuthorised: boolean;
  numbOfItemsInCart: number = 0;

  ngOnInit() {
    this.isAuthorised = this.signingService.isAuthorised();
    this.shopService.getEmittedValue()
      .subscribe( result => this.numbOfItemsInCart = result);
    this.shopService.changeCart();

    this.signingService.getEmittedValue()
      .subscribe( result => {
        this.isAuthorised = result;
        console.log(this.isAuthorised)
      });
  }
}

