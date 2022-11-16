import { createFeature, createReducer, on } from '@ngrx/store';

export interface State {
  error: any;
}

const initialState: State = {
  error: null,
};

export const booksFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState
    // on(BookListPageActions.enter, (state) => ({
    //   ...state,
    //   loading: true,
    // })),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
} = booksFeature;
