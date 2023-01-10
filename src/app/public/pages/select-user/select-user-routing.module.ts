import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectUserComponent } from './select-user.component';

const routes: Routes = [{ path: '', component: SelectUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectUserRoutingModule {}
