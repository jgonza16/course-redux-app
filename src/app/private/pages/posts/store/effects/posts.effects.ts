import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import * as PostActions from '../actions/posts.actions';

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

  constructor(private actions$: Actions, private service: PostsService) {}

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
