import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/reducers/app.reducers';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../store/actions/user.actions';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  select(): void {
    console.log('select user');
  }
}
