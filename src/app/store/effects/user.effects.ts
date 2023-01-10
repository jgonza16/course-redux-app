import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      take(1),
      switchMap(() =>
        this.service.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setSelectedUser),
      filter(({ userSelected }) => !!userSelected),
      tap(() => this.router.navigateByUrl('/posts')),
      map(({ userSelected }) =>
        UserActions.seletedLastUser({ lastUserSelected: userSelected! })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router
  ) {}

  handleError(e: any) {
    alert('error');
    return of(UserActions.setError({ payload: e }));
  }
}
