import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Post } from 'src/app/interfaces/posts.interface';
import * as PostActions from '../actions/posts.actions';

export interface State {
  posts: Post[];
  readonly: boolean;
  isNew: boolean;
  postSelected: Post | null;
  favPosts: Post[];
  error: any;
}

const initialState: State = {
  posts: [],
  readonly: true,
  isNew: false,
  postSelected: null,
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
    on(PostActions.newPostSuccess, (state, { post }) => ({
      ...state,
      posts: [...state.posts, { ...post, fav: false }],
    })),
    on(PostActions.updatePostSuccess, (state, { post }) => ({
      ...state,
      posts: state.posts.map((item) => {
        if (item.id === post.id) {
          return {
            ...item,
            ...post,
          };
        }
        return item;
      }),
    })),
    on(PostActions.setSelectedPost, (state, { postSelected }) => ({
      ...state,
      postSelected,
    })),
    on(PostActions.setReadOnly, (state, { readonly }) => ({
      ...state,
      readonly,
    })),
    on(PostActions.setIsNew, (state, { isNew }) => ({
      ...state,
      isNew,
    })),
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
  selectPostSelected,
  selectReadonly,
  selectIsNew,
  selectPostsState,
} = postFeature;

export const selectNumberFavPosts = createSelector(selectFavPosts, (posts) =>
  posts.length ? posts.length.toString() : ''
);
