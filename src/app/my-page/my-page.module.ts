import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageRoutingModule } from './my-page-routing.module';
import { MyPageComponent } from './my-page/my-page.component';

@NgModule({
  declarations: [MyPageComponent],
  imports: [CommonModule, MyPageRoutingModule],
})
export class MyPageModule {}
