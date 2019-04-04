import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SigningService} from "../signing.service";
import {User} from "../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor ( private fb: FormBuilder,
                private signingService: SigningService,
                private router: Router) { }

  signInForm: FormGroup;

  ngOnInit() {
    this.signInForm =  this.fb.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required, Validators.minLength(7)]],
      });
  }

  onSubmit(form) {
    this.signingService.checkUser( {email: form.value.email, password: form.value.password} as User )
      .subscribe( result => {
          if ( result == true ) {
            this.router.navigate(['/shop']);;
            this.signingService.isAuthorised();
          } else {
            this.router.navigate(['/sign-in']);;
          }
      });
  }
}
