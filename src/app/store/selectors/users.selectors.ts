import { AppState } from '../reducers/app.reducers';

export const getUserSelected = (state: AppState) => state.users.userSelected;

export const getUsers = (state: AppState) => state.users.users;

export const getLastUser = (state: AppState) => state.users.lastUserSelected;
