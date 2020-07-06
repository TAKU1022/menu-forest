import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMyMenuRoutingModule } from './create-my-menu-routing.module';
import { CreateMyMenuComponent } from './create-my-menu/create-my-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CreateMyMenuComponent],
  imports: [
    CommonModule,
    CreateMyMenuRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CreateMyMenuModule {}
