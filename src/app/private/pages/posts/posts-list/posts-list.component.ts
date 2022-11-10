import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/posts.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Observable, take } from 'rxjs';
import * as FromPostReducer from '../store/reducers/posts.reducer';
import * as PostActions from '../store/actions/posts.actions';
import * as userSelectors from '../../../../store/selectors/users.selectors';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(userSelectors.getUserSelected)
      .pipe(
        take(1),
        filter((user) => !!user)
      )
      .subscribe({
        next: (user) =>
          this.store.dispatch(PostActions.loadPosts({ userId: user!.id })),
      });
    this.posts$ = this.store.select(FromPostReducer.selectPosts);
  }
}
