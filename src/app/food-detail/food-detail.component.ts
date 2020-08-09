import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Food } from '@interfaces/food';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  food$: Observable<Food>;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.food$ = this.route.paramMap.pipe(
      switchMap((prams) => {
        const id = prams.get('detail');
        return this.foodService.getFoodById(id);
      }),
      tap(() => this.loadingService.toggleLoading(false))
    );
  }
}
