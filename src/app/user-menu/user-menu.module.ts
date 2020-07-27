import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMenuRoutingModule } from './user-menu-routing.module';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [CommonModule, UserMenuRoutingModule],
})
export class UserMenuModule {}
