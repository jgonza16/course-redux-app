import { createAction, props } from '@ngrx/store';

export const loadPost = createAction('[Post] Load user');

export const loadPostSuccess = createAction(
  '[Post] Load user success',
  props<{ users: any[] }>()
);
