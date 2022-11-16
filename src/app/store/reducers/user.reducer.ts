import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import * as UserActions from '../actions/user.actions';

export interface State {
  users: User[];
  lastUserSelected: User | null;
  userSelected: User | null;
  error: any;
}

export const initialState: State = {
  users: [],
  lastUserSelected: null,
  userSelected: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
  on(UserActions.setSelectedUser, (state, { userSelected }) => ({
    ...state,
    userSelected,
  })),
  on(UserActions.seletedLastUser, (state, { lastUserSelected }) => ({
    ...state,
    lastUserSelected,
  })),
  on(UserActions.setError, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
);
