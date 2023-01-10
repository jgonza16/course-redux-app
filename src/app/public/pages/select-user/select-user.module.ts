import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectUserRoutingModule } from './select-user-routing.module';
import { SelectUserComponent } from './select-user.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SelectUserComponent, UserItemComponent],
  imports: [CommonModule, RouterModule, SelectUserRoutingModule, MatCardModule],
})
export class SelectUserModule {}
