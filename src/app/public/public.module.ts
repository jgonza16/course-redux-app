import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, RouterModule, PublicRoutingModule],
})
export class PublicModule {}
