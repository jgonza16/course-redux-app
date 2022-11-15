import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import * as UserActions from '../actions/user.actions';

export interface State {
  users: User[];
  lastUserSelected: User | null;
  error: any;
}

export const initialState: State = {
  users: [],
  lastUserSelected: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  }))
);
