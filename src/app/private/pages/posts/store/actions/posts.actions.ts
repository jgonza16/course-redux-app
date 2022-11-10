import { createAction, props } from '@ngrx/store';
import { NewPost, Post, PostDTO } from 'src/app/interfaces/posts.interface';

export const loadPosts = createAction(
  '[POSTS] Load Posts',
  props<{ userId: number }>()
);

export const loadPostsSuccess = createAction(
  '[POSTS] Load Posts Success',
  props<{ postsDB: PostDTO[] }>()
);

export const newPost = createAction(
  '[POSTS] New Post',
  props<{ post: NewPost }>()
);

export const newPostSuccess = createAction(
  '[POSTS] New Post Success',
  props<{ post: PostDTO }>()
);

export const updatePost = createAction(
  '[POSTS] Update Post',
  props<{ post: PostDTO }>()
);

export const updatePostSuccess = createAction(
  '[POSTS] Update Post Success',
  props<{ post: PostDTO }>()
);

export const deletePost = createAction(
  '[POSTS] Delete Post',
  props<{ id: number }>()
);

export const deletePostSuccess = createAction(
  '[POSTS] Delete Post Success',
  props<{ id: number }>()
);

export const setFavPost = createAction(
  '[POSTS] Set fav post',
  props<{ post: Post }>()
);

export const setSelectedPost = createAction(
  '[POSTS] Set Selected post',
  props<{ postSelected: Post | null }>()
);

export const setReadOnly = createAction(
  '[POSTS] Set readOnly post',
  props<{ readonly: boolean }>()
);

export const setIsNew = createAction(
  '[POSTS] Set isNew post',
  props<{ isNew: boolean }>()
);

export const setError = createAction(
  '[POSTS] Error',
  props<{ payload: any }>()
);
