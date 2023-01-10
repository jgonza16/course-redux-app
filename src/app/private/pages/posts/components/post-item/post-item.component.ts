import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/interfaces/post.interface';
import { AppState } from 'src/app/store/reducers/app.reducers';
import * as PostsActions from '../../store/actions/posts.actions';

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
    this.store.dispatch(PostsActions.setPostSelected({ postSelected }));
    this.store.dispatch(PostsActions.setReadonly({ readonly: true }));
    this.router.navigateByUrl('/posts/post-detail');
  }

  edit(postSelected: Post): void {
    this.store.dispatch(PostsActions.setPostSelected({ postSelected }));
    this.store.dispatch(PostsActions.setReadonly({ readonly: false }));
    this.router.navigateByUrl('/posts/post-detail');
  }

  drop(id: number): void {
    this.store.dispatch(PostsActions.deletePost({ id }));
  }

  favChange(post: Post): void {
    this.store.dispatch(PostsActions.setFavPost({ post }));
  }
}
