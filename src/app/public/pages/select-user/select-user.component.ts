import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// -- Redux ---
import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserActions from 'src/app/store/actions/users.actions';
import * as UserSelectors from 'src/app/store/selectors/users.selectors';
import { User } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent implements OnInit {
  users$!: Observable<User[]>;
  lastUser$!: Observable<User | null>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.users$ = this.store.select(UserSelectors.getUsers);
    this.lastUser$ = this.store.select(UserSelectors.getLastUser);
  }

  select(userSelected: User): void {
    this.store.dispatch(UserActions.setUserSelected({ userSelected }));
  }
}
