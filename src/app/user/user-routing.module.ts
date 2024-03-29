import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";


const route: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports:[
    RouterModule.forChild(route)
  ],
  exports:[
    RouterModule
  ]
})
export class UserRoutingModule {}
