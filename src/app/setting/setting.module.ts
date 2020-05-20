import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SettingComponent],
  imports: [CommonModule, SettingRoutingModule, MatButtonModule],
})
export class SettingModule {}
