import { Component, OnInit } from '@angular/core';
import { SigningService } from "../signing.service";
import { User } from "../user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor ( private signingService: SigningService ) { }

  ngOnInit() {
  }

  onSubmit(email: string, password: string) {
    this.signingService.createUser( {email, password} as User )
      .subscribe(resp => console.log(resp));
  }
}

