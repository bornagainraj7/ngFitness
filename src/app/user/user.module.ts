import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [SignupComponent, LoginComponent]
})
export class UserModule { }
