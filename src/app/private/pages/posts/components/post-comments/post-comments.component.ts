import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent {
  comments$: Observable<Comment[]> = of([]);
}
