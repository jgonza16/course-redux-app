import { ActionReducerMap } from '@ngrx/store';
import * as UserReducer from './users.reducer';

export interface AppState {
  users: UserReducer.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: UserReducer.usersReducer,
};
