import {Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PasswordValidation } from "../password-validation";
import { SigningService } from "../signing.service";
import {User} from "../user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor ( private fb: FormBuilder,
                private signingService: SigningService,
                private router: Router) { }

  signUpForm: FormGroup;
  users;
  ngOnInit() {
    this.signUpForm =  this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword:   ['', Validators.required],
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  onSubmit(form) {
    this.signingService.createUser( {email: form.value.email, password: form.value.password} as User )
      .subscribe( result => {
        console.log(result);
        this.router.navigate(['/sign-in']);;
      })
  }

}

