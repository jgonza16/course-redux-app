import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewPost, Post, PostDTO } from 'src/app/interfaces/post.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers/app.reducers';
import { combineLatestWith, Observable, take } from 'rxjs';
import * as FromPostReducer from '../../store/reducers/posts.reducer';
import * as UserActions from '../../../../../store/selectors/users.selectors';
import * as PostActions from '../../store/actions/posts.actions';

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
  form!: FormGroup<PostForm>;
  dataPost$!: Observable<FromPostReducer.State>;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setForm(null);
    this.dataPost$ = this.store.select(FromPostReducer.selectPostsState);
    this.dataPost$.pipe(take(1)).subscribe({
      next: ({ postSelected }) => this.setForm(postSelected),
    });
  }

  setForm(post: Post | null): void {
    this.form = this.fb.nonNullable.group({
      title: [post?.title ?? '', Validators.required],
      body: [post?.body ?? '', Validators.required],
    });
  }

  save(): void {
    this.dataPost$
      .pipe(
        take(1),
        combineLatestWith(this.store.select(UserActions.getUserSelected))
      )
      .subscribe({
        next: ([{ postSelected }, user]) => {
          const { body = '', title = '' } = this.form.value;
          if (!postSelected) {
            const post: NewPost = {
              userId: user!.id,
              title,
              body,
            };
            this.store.dispatch(PostActions.newPost({ post }));
          } else {
            const post: PostDTO = {
              userId: user!.id,
              id: postSelected.id,
              title,
              body,
            };
            this.store.dispatch(PostActions.updatePost({ post }));
          }
        },
      });
  }
}
