import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

@NgModule({
  declarations: [PrivateComponent],
  imports: [CommonModule, RouterModule, PrivateRoutingModule, ToolbarComponent],
})
export class PrivateModule {}
