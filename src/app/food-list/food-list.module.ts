import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodListRoutingModule } from './food-list-routing.module';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [FoodListComponent, FoodDetailComponent],
  imports: [
    CommonModule,
    FoodListRoutingModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
})
export class FoodListModule {}
