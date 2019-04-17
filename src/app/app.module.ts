import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { TrainingModule } from './training/training.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { UserService } from './user/user.service';

import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
import { reducers } from './reducers/app.reducer';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserModule,
    TrainingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [UserService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
