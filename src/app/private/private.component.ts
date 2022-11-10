import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/posts.interface';
import { User } from '../interfaces/user.interface';
import { AppState } from '../store/reducers/app.reducer';
import * as UserSelectors from '../store/selectors/users.selectors';
import * as FromPostReducer from './pages/posts/store/reducers/posts.reducer';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  user$!: Observable<User | null>;
  favNumberPosts$!: Observable<string>;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(UserSelectors.getUserSelected);
    this.favNumberPosts$ = this.store.select(
      FromPostReducer.selectNumberFavPosts
    );
  }

  logout(): void {
    console.log('logout');
    this.router.navigateByUrl('/public/select-user');
  }

  goFav(): void {
    this.router.navigateByUrl('/posts/post-favs');
  }
}
