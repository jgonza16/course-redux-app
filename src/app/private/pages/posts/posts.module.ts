import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// --Custom Compoents --
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostFavsComponent } from './post-favs/post-favs.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
// --Angular Material--
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { StoreModule } from '@ngrx/store';
import { booksFeature } from './store/reducers/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/effects/posts.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostsListComponent,
    PostDetailComponent,
    PostFavsComponent,
    PostItemComponent,
    PostInfoComponent,
    PostCommentsComponent,
    CommentItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature(booksFeature),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {}
