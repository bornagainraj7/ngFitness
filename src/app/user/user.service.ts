import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";

import { UIService } from "../shared/ui.service";

import { Store } from "@ngrx/store";
import * as fromRoot from './../reducers/app.reducer';
import * as UI from './../shared/ui.actions';
import * as Auth from './auth.actions';


@Injectable()
export class UserService {


  constructor(private appRouter: Router, private fireAuth: AngularFireAuth, private trainingService: TrainingService, private uiService: UIService, private store: Store<fromRoot.State>) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe(user => {
      if(user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.appRouter.navigate(['/training']);
      } else {
        this.trainingService.cancelFireStoreSubscription();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.appRouter.navigate(['/login']);
      }
    });
  }


  signupUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      console.log(result);
    })
    .catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 3000);
    });

  }


  loginUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 3000);
    })
  }


  logout() {
    this.fireAuth.auth.signOut();
  }


}

