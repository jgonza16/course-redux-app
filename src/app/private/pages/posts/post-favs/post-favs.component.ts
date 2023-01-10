import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { AppState } from 'src/app/store/reducers/app.reducers';
import * as FromPostReducer from '../store/reducers/posts.reducer';

@Component({
  selector: 'app-post-favs',
  templateUrl: './post-favs.component.html',
  styleUrls: ['./post-favs.component.scss'],
})
export class PostFavsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(FromPostReducer.selectFavPost);
  }
}
