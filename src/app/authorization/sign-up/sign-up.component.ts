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
  subscriptions: Subscription = new Subscription();
  user: User;

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
    // @ts-ignore
    this.user = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };
    this.subscriptions.add(this.signingService.createUser(this.user as User)
        .subscribe(newUser => {
          this.signingService.authorizeUser(newUser.email);
          this.router.navigate(['/shop']);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

