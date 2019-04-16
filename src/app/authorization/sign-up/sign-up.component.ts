import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {PasswordMatch} from '../../utils/password-match';

import {SigningService} from '../../services/signing.service';

import {User} from '../../models/user.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder,
              private signingService: SigningService,
              private router: Router) {
  }

  signUpForm: FormGroup;
  private formSubmitAttempt = false;
  subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.signUpForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: PasswordMatch('password', 'confirmPassword')
      });
  }

  onSubmit() {

    this.formSubmitAttempt = true;
    if ( this.signUpForm.valid ) {
      const user = {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      };
      this.subscriptions.add(this.signingService.createUser(user as User)
        .subscribe(newUser => {
          this.signingService.authorizeUser(newUser.email);
          this.router.navigate(['/shop']);
        })
      );
    }
  }

  isFieldValid(field: string) {
    return (!this.signUpForm.get(field).valid && this.signUpForm.get(field).touched && this.formSubmitAttempt) ||
      (this.signUpForm.get(field).untouched && this.formSubmitAttempt);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

