import { createAction, props } from '@ngrx/store';
import { NewPost, PostDTO } from 'src/app/interfaces/post.interface';
import { Post } from '../../../../../interfaces/post.interface';

export const loadPost = createAction(
  '[Post] Load posts',
  props<{ userId: number }>()
);

export const loadPostSuccess = createAction(
  '[Post] Load post success',
  props<{ postsDb: PostDTO[] }>()
);

export const deletePost = createAction(
  '[Post] Delete posts',
  props<{ id: number }>()
);

export const deletePostSuccess = createAction(
  '[Post] Delete post success',
  props<{ id: number }>()
);

export const newPost = createAction(
  '[Post] New posts',
  props<{ post: NewPost }>()
);

export const newPostSuccess = createAction(
  '[Post] New post success',
  props<{ post: PostDTO }>()
);

export const updatePost = createAction(
  '[Post] Update posts',
  props<{ post: PostDTO }>()
);

export const updatePostSuccess = createAction(
  '[Post] Update post success',
  props<{ post: PostDTO }>()
);

export const setFavPost = createAction(
  '[Post] Set fav post',
  props<{ post: Post }>()
);

export const setReadonly = createAction(
  '[Post] Set readonly post',
  props<{ readonly: boolean }>()
);

export const setPostSelected = createAction(
  '[Post] Set post selected',
  props<{ postSelected: Post | null }>()
);

export const setError = createAction(
  '[Post] Set error',
  props<{ payload: any }>()
);
