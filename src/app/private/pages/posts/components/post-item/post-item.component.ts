import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/interfaces/posts.interface';
import * as PostActions from '../../store/actions/posts.actions';
import { AppState } from 'src/app/store/reducers/app.reducer';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {}

  show(postSelected: Post): void {
    this.store.dispatch(PostActions.setReadOnly({ readonly: true }));
    this.store.dispatch(PostActions.setIsNew({ isNew: false }));
    this.store.dispatch(PostActions.setSelectedPost({ postSelected }));
    this.router.navigateByUrl('/posts/post-detail');
  }

  edit(postSelected: Post): void {
    this.store.dispatch(PostActions.setReadOnly({ readonly: false }));
    this.store.dispatch(PostActions.setIsNew({ isNew: false }));
    this.store.dispatch(PostActions.setSelectedPost({ postSelected }));
    this.router.navigateByUrl('/posts/post-detail');
  }

  drop({ id }: Post): void {
    this.store.dispatch(PostActions.deletePost({ id }));
  }

  favChange(post: Post): void {
    this.store.dispatch(PostActions.setFavPost({ post }));
  }
}
