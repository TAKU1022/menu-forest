import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DayMenuWithFood, MyMenu } from '@interfaces/my-menu';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, tap } from 'rxjs/operators';
import { User } from '@interfaces/user';
import { DayService } from 'src/app/services/day.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { Food } from '@interfaces/food';
import { ChangeMyMenuDialogComponent } from 'src/app/change-my-menu-dialog/change-my-menu-dialog/change-my-menu-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private userId: string = this.authService.userId;
  private eatCount: number;
  private isEatenBreakfast: boolean;
  private isEatenLunch: boolean;
  private isEatenDinner: boolean;
  private today: number;
  private myMenu: MyMenu;

  todayMenu$: Observable<DayMenuWithFood> = this.myMenuService
    .getTodayMenu(this.userId)
    .pipe(tap(() => this.loadingService.toggleLoading(false)));

  constructor(
    private myMenuService: MyMenuService,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dayService: DayService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.resetEatStatus();
    this.getEatStatus();
    this.getMyMenu();
  }

  private resetEatStatus(): void {
    const date = new Date();
    this.today = date.getDay();
    this.dayService.day$
      .pipe(take(1))
      .toPromise()
      .then((day: any) => {
        if (this.today !== day.dayNumber) {
          this.userService.initializeUserIsEatenFood(this.userId);
          this.dayService.changeDayNumber(this.today);
        }
      });
  }

  private getEatStatus(): void {
    this.authService.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => {
        if (user) {
          this.isEatenBreakfast = user.isEatenBreakfast;
          this.isEatenLunch = user.isEatenLunch;
          this.isEatenDinner = user.isEatenDinner;
          this.eatCount = user.eatCount;
        }
      });
  }

  private getMyMenu(): void {
    this.myMenuService
      .getMyMenuByUserId(this.userId)
      .pipe(take(1))
      .toPromise()
      .then((myMenu: MyMenu) => (this.myMenu = myMenu));
  }

  increaseEatCount(time: string): void {
    const increasedEatCount = ++this.eatCount;
    this.userService.changeEatCount(this.userId, increasedEatCount).then(() => {
      this.snackBar.open('よく頑張りました！', null);
      this.userService.changeUserIsEatenFood(this.userId, time, true);
      this.getEatStatus();
    });
  }

  reduceEatCount(time: string): void {
    const reducedEatCount = --this.eatCount;
    this.userService.changeEatCount(this.userId, reducedEatCount).then(() => {
      this.snackBar.open('取り消しました！', null);
      this.userService.changeUserIsEatenFood(this.userId, time, false);
      this.getEatStatus();
    });
  }

  checkTime(time: string): boolean {
    switch (time) {
      case '朝':
        return this.isEatenBreakfast;
      case '昼':
        return this.isEatenLunch;
      case '夜':
        return this.isEatenDinner;
    }
  }

  openChangeMyMenuDialog(food: Food, time: string): void {
    this.dialog.open(ChangeMyMenuDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      minWidth: 320,
      data: {
        myMenu: this.myMenu,
        food,
        dayOfWeek: this.today,
        time,
      },
    });
  }
}
