import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post: any = {};
  constructor(private router: Router) {}

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

  favChange(): void {
    console.log('change fav');
  }
}
