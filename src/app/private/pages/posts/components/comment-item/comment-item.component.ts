import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  @Input() comment!: Comment;
}
