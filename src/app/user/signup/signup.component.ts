import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public maxDate;
  public isLoading:boolean = false;
  private loadingSubs: Subscription;

  constructor(private userService: UserService, private uiService: UIService) { }

  ngOnInit() {
    this.uiService.loadingStateChanged.subscribe(loading => this.isLoading = loading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onFormSubmit(form: NgForm) {
    this.userService.signupUser({ email: form.value.email, password: form.value.password });
  }
}
