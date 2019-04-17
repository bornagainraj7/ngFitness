import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from './../../user/user.service';

import { Store } from '@ngrx/store';
import * as fromRoot from './../../reducers/app.reducer';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuth$: Observable<boolean>;

  @Output() sidenavToggle = new EventEmitter<void>();


  constructor(private userService: UserService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.userService.logout();
  }

}
