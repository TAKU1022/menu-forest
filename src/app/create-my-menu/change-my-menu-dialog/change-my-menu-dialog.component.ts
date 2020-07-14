import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from '@interfaces/food';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { DayMenu } from '@interfaces/my-menu';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-my-menu-dialog',
  templateUrl: './change-my-menu-dialog.component.html',
  styleUrls: ['./change-my-menu-dialog.component.scss'],
})
export class ChangeMyMenuDialogComponent implements OnInit {
  foods$: Observable<Food[]> = this.foodService.getFoods();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      myMenuId: string;
      food: Food;
      dayOfWeek: number;
      time: string;
    },
    private foodService: FoodService,
    private myMenuService: MyMenuService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  changeMyMenu(foodId: string) {
    this.myMenuService
      .changeMyMenu(
        this.data.myMenuId,
        this.data.dayOfWeek,
        this.data.time,
        foodId
      )
      .then(() => {
        this.snackBar.open('My献立を変更しました！', null, {
          duration: 3000,
        });
      });
  }
}
