import { Component, OnInit } from '@angular/core';
import * as FromPostReducer from '../../store/reducers/posts.reducer';
import * as PostActions from '../../store/actions/posts.actions';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Post, NewPost, PostDTO } from 'src/app/interfaces/posts.interface';
import { combineLatestWith, switchMap } from 'rxjs/operators';
import * as userSelectors from '../../../../../store/selectors/users.selectors';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface PostForm {
  title: FormControl<string>;
  body: FormControl<string>;
}

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
})
export class PostInfoComponent implements OnInit {
  dataPost$!: Observable<FromPostReducer.State>;
  form!: FormGroup<PostForm>;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadForm(null);
    this.dataPost$ = this.store.select(FromPostReducer.selectPostsState);
    this.dataPost$.pipe(take(1)).subscribe({
      next: ({ postSelected }) => this.loadForm(postSelected),
    });
  }

  loadForm(post: Post | null): void {
    this.form = this.fb.nonNullable.group({
      title: [post?.title ?? '', Validators.required],
      body: [post?.body ?? '', Validators.required],
    });
  }

  save(): void {
    this.dataPost$
      .pipe(
        take(1),
        combineLatestWith(this.store.select(userSelectors.getUserSelected))
      )
      .subscribe({
        next: ([{ postSelected, isNew }, user]) => {
          const { title, body } = this.form.value;
          if (isNew) {
            const post: NewPost = {
              userId: user!.id,
              title: title!,
              body: body!,
            };
            this.store.dispatch(PostActions.newPost({ post }));
          } else {
            const post: PostDTO = {
              userId: user!.id,
              id: postSelected!.id,
              title: title!,
              body: body!,
            };
            this.store.dispatch(PostActions.updatePost({ post }));
          }
        },
      });
  }
}
