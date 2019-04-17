import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { TrainingComponent } from '../training/training/training.component';
import { AuthGuard } from '../user/auth.guard';


const route: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard] }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule { }
