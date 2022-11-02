import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostFavsComponent } from './post-favs/post-favs.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PostsListComponent,
    PostDetailComponent,
    PostFavsComponent,
    PostItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostsRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class PostsModule {}
