import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MenuRoutingModule, MatCardModule],
})
export class MenuModule {}
