import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from '../actions/users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.service.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((e) => this.handleError(e))
        )
      )
    )
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setUserSelected),
      filter(({ userSelected }) => !!userSelected),
      tap(() => this.router.navigateByUrl('/posts')),
      map(({ userSelected }) =>
        UserActions.setLastUser({ lastUser: userSelected })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router
  ) {}

  handleError(err: any) {
    console.warn(err);
    return of(UserActions.setError({ payload: err }));
  }
}
