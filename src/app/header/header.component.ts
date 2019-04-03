import { Component, OnInit } from '@angular/core';
import {SigningService} from "../signing.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private signingService: SigningService ) { }

  isAuthorised: boolean;

  ngOnInit() {
    this.isAuthorised = this.signingService.isAuthorised();
  }

}
