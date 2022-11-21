import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Post } from 'src/app/interfaces/post.interface';
import * as PostsActions from '../actions/posts.actions';

export interface State {
  posts: Post[];
  readonly: boolean;
  postSelected: Post | null;
  favPost: Post[];
  error: any;
}

const initialState: State = {
  posts: [],
  readonly: false,
  postSelected: null,
  favPost: [],
  error: null,
};

export const booksFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(PostsActions.loadPostSuccess, (state, { postsDb }) => {
      const favIds = state.favPost.map(({ id }) => id);
      const posts = postsDb.map((post) => ({
        ...post,
        fav: favIds.includes(post.id),
      }));
      return {
        ...state,
        posts,
      };
    }),
    on(PostsActions.setFavPost, (state, { post }) => {
      let favPost: Post[] = [];
      if (post.fav) {
        favPost = state.favPost.filter(({ id }) => post.id !== id);
      } else {
        favPost = [...state.favPost, { ...post, fav: true }];
      }
      const posts = state.posts.map((item) => ({
        ...item,
        fav: item.id === post.id ? !item.fav : item.fav,
      }));

      return {
        ...state,
        favPost,
        posts,
      };
    }),
    on(PostsActions.deletePostSuccess, (state, { id }) => {
      const posts = state.posts.filter((post) => post.id !== id);
      const favPost = state.favPost.filter((post) => post.id !== id);
      return {
        ...state,
        posts,
        favPost,
      };
    }),
    on(PostsActions.newPostSuccess, (state, { post }) => ({
      ...state,
      posts: [...state.posts, { ...post, fav: false }],
    })),
    on(PostsActions.setPostSelected, (state, { postSelected }) => ({
      ...state,
      postSelected,
    })),
    on(PostsActions.setReadonly, (state, { readonly }) => ({
      ...state,
      readonly,
    })),
    on(PostsActions.updatePostSuccess, (state, { post }) => ({
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
    }))
  ),
});

export const {
  name,
  reducer,
  selectReadonly,
  selectError,
  selectPosts,
  selectPostsState,
  selectFavPost,
  selectPostSelected,
} = booksFeature;

export const numbersFavsSelector = createSelector(selectFavPost, (posts) =>
  posts.length ? posts.length.toString() : ''
);
