import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodListRoutingModule } from './food-list-routing.module';
import { FoodListComponent } from './food-list/food-list.component';

@NgModule({
  declarations: [FoodListComponent],
  imports: [CommonModule, FoodListRoutingModule],
})
export class FoodListModule {}
