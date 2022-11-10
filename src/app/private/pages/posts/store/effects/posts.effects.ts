import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostService } from '../../../../../services/post.service';
import * as PostActions from '../actions/posts.actions';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      switchMap(({ userId }) =>
        this.service.getPostsByUser(userId).pipe(
          map((postsDB) => PostActions.loadPostsSuccess({ postsDB })),
          catchError((e) => this.handleError(e))
        )
      )
    )
  );

  deletePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      switchMap(({ id }) =>
        this.service.deletePost(id).pipe(
          map(() => PostActions.deletePostSuccess({ id })),
          catchError((e) => this.handleError(e))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: PostService) {}

  handleError(err: any) {
    console.warn(err);
    return of(PostActions.setError({ payload: err }));
  }
}
