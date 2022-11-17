import { createAction, props } from '@ngrx/store';
import { PostDTO } from 'src/app/interfaces/post.interface';
import { Post } from '../../../../../interfaces/post.interface';

export const loadPost = createAction(
  '[Post] Load posts',
  props<{ userId: number }>()
);

export const loadPostSuccess = createAction(
  '[Post] Load post success',
  props<{ postsDb: PostDTO[] }>()
);

export const setFavPost = createAction(
  '[Post] Set fav post',
  props<{ post: Post }>()
);

export const setError = createAction(
  '[Post] Set error',
  props<{ payload: any }>()
);
