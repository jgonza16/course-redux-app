import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    console.log('logout');
    this.router.navigateByUrl('/public/select-user');
  }
  goFav(): void {
    this.router.navigateByUrl('/posts/post-favs');
  }
}
