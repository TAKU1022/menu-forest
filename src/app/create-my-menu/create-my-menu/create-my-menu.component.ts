import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { DayMenuWithFood, MyMenu } from '@interfaces/my-menu';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMyMenuDialogComponent } from '../change-my-menu-dialog/change-my-menu-dialog.component';
import { Food } from '@interfaces/food';

@Component({
  selector: 'app-create-my-menu',
  templateUrl: './create-my-menu.component.html',
  styleUrls: ['./create-my-menu.component.scss'],
})
export class CreateMyMenuComponent implements OnInit {
  userId: string = this.authService.userId;
  weekMenu$: Observable<
    DayMenuWithFood[]
  > = this.myMenuService.getDayMenuWithFoods(this.userId);
  myMenu$: Observable<MyMenu> = this.myMenuService.getMyMenuByUserId(
    this.userId
  );

  constructor(
    private authService: AuthService,
    private myMenuService: MyMenuService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openChangeMyMenu(
    myMenuId: string,
    food: Food,
    dayOfWeek: number,
    time: string
  ): void {
    this.dialog.open(ChangeMyMenuDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: {
        myMenuId,
        food,
        dayOfWeek,
        time,
      },
    });
  }
}
