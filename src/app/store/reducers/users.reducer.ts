import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import * as UserActions from '../actions/users.actions';

export interface State {
  users: User[];
  userSelected: User | null;
  lastUser: User | null;
  error: any;
}

export const initialState: State = {
  users: [],
  userSelected: null,
  lastUser: null,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserActions.setUserSelected, (state, { userSelected }) => ({
    ...state,
    userSelected,
  })),
  on(UserActions.setLastUser, (state, { lastUser }) => ({
    ...state,
    lastUser,
  })),
  on(UserActions.setError, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
);
