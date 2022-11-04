import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from '../store/reducers/app.reducer';
import { getUserSelected } from '../store/selectors/users.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}
  canLoad(): Observable<boolean> {
    return this.store.select(getUserSelected).pipe(
      map((user) => {
        if (user) return true;
        this.router.navigateByUrl('/public');
        return false;
      })
    );
  }
}
