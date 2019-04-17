import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from './../../reducers/app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public isLoading$:Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private userService: UserService, private uiService: UIService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe((loading) => {
    //   this.isLoading = loading;
    // })
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)] })
    });

  }

  onLogin() {
    this.userService.loginUser({ email: this.form.value.email, password: this.form.value.password });
  }



  ngOnDestroy() {
    // this.loadingSubs.unsubscribe();
  }
}
