import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {SigningService} from '../../services/signing.service';

import {User} from '../../models/user.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
              private signingService: SigningService,
              private router: Router) {
  }

  signInForm: FormGroup;
  subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  onSubmit() {

    const user = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    };
    this.subscriptions.add(
      this.signingService.checkUser( user as User )
        .subscribe(result => {
          if (result) {
            this.router.navigate(['/shop']);
            this.signingService.changeAuthorization();
          } else {
            this.router.navigate(['/sign-in']);
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
