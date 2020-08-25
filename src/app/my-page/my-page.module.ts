import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageRoutingModule } from './my-page-routing.module';
import { MyPageComponent } from './my-page/my-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MyPageComponent],
  imports: [
    CommonModule,
    MyPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class MyPageModule {}
