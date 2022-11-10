import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducers/app.reducer';
import * as FromPostReducer from '../store/reducers/posts.reducer';

@Component({
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  isNew$!: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isNew$ = this.store.select(FromPostReducer.selectIsNew);
  }
}
