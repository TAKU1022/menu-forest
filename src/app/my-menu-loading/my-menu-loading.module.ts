import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuLoadingRoutingModule } from './my-menu-loading-routing.module';
import { MyMenuLoadingComponent } from './my-menu-loading/my-menu-loading.component';

@NgModule({
  declarations: [MyMenuLoadingComponent],
  imports: [CommonModule, MyMenuLoadingRoutingModule],
})
export class MyMenuLoadingModule {}
