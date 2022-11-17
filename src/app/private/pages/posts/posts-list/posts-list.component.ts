import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducers';
import * as PostsActions from '../store/actions/posts.actions';
import * as UserSelectors from '../../../../store/selectors/users.selectors';
import { take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import * as FromPostsReducer from '../store/reducers/posts.reducer';

@Component({
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(UserSelectors.getUserSelected)
      .pipe(
        take(1),
        filter((user) => !!user)
      )
      .subscribe({
        next: (user) => {
          this.store.dispatch(PostsActions.loadPost({ userId: user!.id }));
        },
      });
    this.posts$ = this.store.select(FromPostsReducer.selectPosts);
  }
}
