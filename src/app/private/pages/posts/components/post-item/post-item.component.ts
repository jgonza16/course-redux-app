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

  show(): void {
    this.router.navigateByUrl('/posts/post-detail');
  }

  edit(): void {
    this.router.navigateByUrl('/posts/post-detail');
  }

  drop(): void {
    console.log('Drop');
  }

  favChange(post: Post): void {
    this.store.dispatch(PostsActions.setFavPost({ post }));
    console.log('change fav');
  }
}
