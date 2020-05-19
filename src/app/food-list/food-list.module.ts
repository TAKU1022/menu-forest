import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodListRoutingModule } from './food-list-routing.module';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailComponent } from '../food-detail/food-detail.component';

@NgModule({
  declarations: [FoodListComponent, FoodDetailComponent],
  imports: [CommonModule, FoodListRoutingModule],
})
export class FoodListModule {}
