import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';

export const loadUsers = createAction('[USER] Load Users');

export const loadUsersSuccess = createAction(
  '[USER] Load Users Success',
  props<{ users: User[] }>()
);

export const setUserSelected = createAction(
  '[USER] Select User',
  props<{ userSelected: User | null }>()
);

export const setLastUser = createAction(
  '[USER] Select last User',
  props<{ lastUser: User | null }>()
);

export const setError = createAction('[USER] Error', props<{ payload: any }>());
