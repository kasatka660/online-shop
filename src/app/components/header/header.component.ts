import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {SigningService} from '../../services/signing.service';
import {ShopService} from '../../services/shop.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor( private signingService: SigningService,
               private shopService: ShopService) { }

  isAuthorised: boolean;
  numbOfItemsInCart = 0;
  subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.isAuthorised = this.signingService.isAuthorised();
    this.subscriptions.add( this.shopService.getEmittedValue()
      .subscribe( result => this.numbOfItemsInCart = result ));
    this.shopService.updateCart();
    this.subscriptions.add(this.signingService.getEmittedValue()
      .subscribe( result => this.isAuthorised = result ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

