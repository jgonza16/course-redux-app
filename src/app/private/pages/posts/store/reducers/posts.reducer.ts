import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Post } from 'src/app/interfaces/posts.interface';
import * as PostActions from '../actions/posts.actions';

interface State {
  posts: Post[];
  isNew: boolean;
  favPosts: Post[];
  error: any;
}

const initialState: State = {
  posts: [],
  isNew: true,
  favPosts: [],
  error: null,
};

export const postFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(PostActions.loadPostsSuccess, (state, { postsDB }) => {
      const favIds = state.favPosts.map(({ id }) => id);
      const posts = postsDB.map((post) => ({
        ...post,
        fav: favIds.includes(post.id),
      }));
      return {
        ...state,
        posts,
      };
    }),
    on(PostActions.setFavPost, (state, { post }) => {
      let favPosts: Post[] = [];
      if (post.fav) {
        favPosts = state.favPosts.filter(({ id }) => post.id !== id);
      } else {
        favPosts = [...state.favPosts, { ...post, fav: true }];
      }
      const posts = state.posts.map((item) => ({
        ...item,
        fav: item.id === post.id ? !item.fav : item.fav,
      }));
      return {
        ...state,
        posts,
        favPosts,
      };
    }),
    on(PostActions.deletePostSuccess, (state, { id }) => {
      const favPosts = state.favPosts.filter((post) => post.id !== id);
      const posts = state.posts.filter((post) => post.id !== id);
      return {
        ...state,
        posts,
        favPosts,
      };
    }),
    on(PostActions.setError, (state, { payload }) => ({
      ...state,
      error: payload,
    }))
  ),
});

export const {
  name,
  reducer,
  selectFavPosts,
  selectPosts,
  selectIsNew,
  selectPostsState,
} = postFeature;

export const selectNumberFavPosts = createSelector(selectFavPosts, (posts) =>
  posts.length ? posts.length.toString() : ''
);
