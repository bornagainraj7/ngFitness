import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from './../../reducers/app.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public isAuth$: Observable<boolean>;

  @Output() closeSidenav = new EventEmitter<void>();


  constructor(private userService: UserService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.userService.logout();
  }


}
