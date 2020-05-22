import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { Food } from 'src/app/interfaces/food';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  days = ['月', '火', '水', '木', '金', '土', '日'];
  dayFood$: Observable<Food> = this.foodService.getDayFood();

  constructor(
    private foodService: FoodService
  ) {}

  ngOnInit(): void {}
}
