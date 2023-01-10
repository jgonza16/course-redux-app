import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducers';
import * as PostsActions from '../store/actions/posts.actions';
import * as UserSelectors from '../../../../store/selectors/users.selectors';
import { take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import * as FromPostsReducer from '../store/reducers/posts.reducer';
import * as UserActions from '../../../../store/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>, private router: Router) {}

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

  newPost(): void {
    this.store.dispatch(PostsActions.setPostSelected({ postSelected: null }));
    this.router.navigateByUrl('/posts/post-detail');
  }
}
