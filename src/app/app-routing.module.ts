import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from './store/reducers/app.reducers';
import * as UserSelectors from './store/selectors/users.selectors';

const guardUser = () => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  return store.select(UserSelectors.getUserSelected).pipe(
    map((user) => {
      if (user) return true;
      router.navigateByUrl('/public');
      return false;
    })
  );
};

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '',
    canLoad: [guardUser],
    loadChildren: () =>
      import('./private/private.module').then((m) => m.PrivateModule),
  },
  { path: '**', redirectTo: 'public', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
