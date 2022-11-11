import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { PostService } from '../../../../../services/post.service';
import * as PostActions from '../actions/posts.actions';

const CACHE_TIME = 60000;
@Injectable()
export class PostEffects {
  lastRequest = 0;

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      filter(() => !this.isChacheValid(this.lastRequest, CACHE_TIME)),
      tap(() => (this.lastRequest = new Date().getTime())),
      switchMap(({ userId }) =>
        this.service.getPostsByUser(userId).pipe(
          map((postsDB) => PostActions.loadPostsSuccess({ postsDB })),
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
          map((post) => PostActions.newPostSuccess({ post })),
          tap(() => this.router.navigateByUrl('/posts')),
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
          map((post) => PostActions.updatePostSuccess({ post })),
          tap(() => this.router.navigateByUrl('/posts')),
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

  setIsNew$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.setIsNew),
        filter(({ isNew }) => isNew),
        tap(() => this.router.navigateByUrl('/posts/post-detail'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: PostService,
    private router: Router
  ) {}

  handleError(err: any) {
    console.warn(err);
    return of(PostActions.setError({ payload: err }));
  }

  isChacheValid(lastRequest: number, cacheTime: number): boolean {
    const now = new Date();
    const timeAllowed = new Date(lastRequest + cacheTime);
    return !!lastRequest && now.getTime() < timeAllowed.getTime();
  }
}
