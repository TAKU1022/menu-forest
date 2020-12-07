import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageRoutingModule } from './my-page-routing.module';
import { MyPageComponent } from './my-page/my-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MyPageComponent],
  imports: [
    CommonModule,
    MyPageRoutingModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
})
export class MyPageModule {}
