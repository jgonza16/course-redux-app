import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';

export const loadUsers = createAction('[user] Load user');

export const loadUsersSuccess = createAction(
  '[user] Load user success',
  props<{ users: User[] }>()
);

export const seletedLastUser = createAction(
  '[user] Selected last User',
  props<{ lastUserSelected: User }>()
);

export const setSelectedUser = createAction(
  '[user] set Selected User',
  props<{ userSelected: User | null }>()
);

export const setError = createAction(
  '[user] Set error',
  props<{ payload: any }>()
);
