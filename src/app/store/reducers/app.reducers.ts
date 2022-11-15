import { ActionReducerMap } from '@ngrx/store';
import * as fromUserReducer from './user.reducer';

export interface AppState {
  users: fromUserReducer.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: fromUserReducer.userReducer,
};
