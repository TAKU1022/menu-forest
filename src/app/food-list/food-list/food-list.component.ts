import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { Food } from 'src/app/interfaces/food';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  foods$: Observable<Food[]> = this.foodService.getFood();

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {}
}
