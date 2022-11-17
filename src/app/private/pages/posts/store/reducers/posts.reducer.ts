import { createFeature, createReducer, on } from '@ngrx/store';
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
        loading: true,
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
        loading: true,
        favPost,
        posts,
      };
    })
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
