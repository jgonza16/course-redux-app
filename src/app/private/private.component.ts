import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import * as UserActions from '../store/actions/user.actions';
import { AppState } from '../store/reducers/app.reducers';
import * as UserSelectors from '../store/selectors/users.selectors';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  user$!: Observable<User | null>;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(UserSelectors.getUserSelected);
  }

  logout(): void {
    this.store.dispatch(UserActions.setSelectedUser({ userSelected: null }));
    this.router.navigateByUrl('/public/select-user');
  }

  goFav(): void {
    this.router.navigateByUrl('/posts/post-favs');
  }
}
