import { Component } from '@angular/core';
import {Router} from '@angular/router';

import {SigningService} from '../../services/signing.service';
import {ShopService} from '../../services/shop.service';


@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {

  constructor( private signingService: SigningService,
               private shopService: ShopService,
               private router: Router) { }

  signOut() {
    this.signingService.signOut();
  }
  goBack() {
    this.router.navigate(['/shop']);
  }
}
