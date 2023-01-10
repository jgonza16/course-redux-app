import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import * as PostActions from '../actions/posts.actions';
import { Router } from '@angular/router';

const CACHE_TIME = 60000;

@Injectable()
export class PostsEffects {
  lastRequest = 0;

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPost),
      filter(() => !this.isCacheValid(this.lastRequest, CACHE_TIME)),
      tap(() => (this.lastRequest = new Date().getTime())),
      switchMap(({ userId }) =>
        this.service.getPostsByUser(userId).pipe(
          map((postsDb) => PostActions.loadPostSuccess({ postsDb })),
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

  newPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.newPost),
      switchMap(({ post }) =>
        this.service.createPost(post).pipe(
          map((post) => {
            this.router.navigateByUrl('/posts');
            return PostActions.newPostSuccess({ post });
          }),
          catchError((e) => this.handleError(e))
        )
      )
    )
  );

  updatePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      switchMap(({ post }) =>
        this.service.updatePost(post).pipe(
          map((post) => {
            this.router.navigateByUrl('/posts');
            return PostActions.updatePostSuccess({ post });
          }),
          catchError((e) => this.handleError(e))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: PostsService,
    private router: Router
  ) {}

  handleError(e: any) {
    alert('error');
    return of(PostActions.setError({ payload: e }));
  }

  isCacheValid(lastRequest: number, cachetime: number): boolean {
    const now = new Date();
    const timeAllowed = new Date(lastRequest + cachetime);
    return !!lastRequest && now.getTime() < timeAllowed.getTime();
  }
}
