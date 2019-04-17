import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TrainingComponent } from "./training/training.component";
import { AuthGuard } from "../user/auth.guard";

  const route: Routes = [
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
  ]

@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ]
})
export class TrainingRoutingModule {}
