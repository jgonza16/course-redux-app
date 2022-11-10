import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// --Custom Compoents --
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostFavsComponent } from './post-favs/post-favs.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';
// --Angular Material--
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { StoreModule } from '@ngrx/store';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { postFeature } from './store/reducers/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/effects/posts.effects';

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
    PostsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature(postFeature),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostsModule {}
