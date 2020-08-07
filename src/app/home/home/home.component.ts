import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DayMenuWithFood } from '@interfaces/my-menu';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, tap } from 'rxjs/operators';
import { User } from '@interfaces/user';
import { DayService } from 'src/app/services/day.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userId: string = this.authService.userId;
  todayMenu$: Observable<DayMenuWithFood> = this.myMenuService
    .getTodayMenu(this.userId)
    .pipe(tap(() => this.loadingService.toggleLoading(false)));
  eatCount: number;
  isEatenBreakfast: boolean;
  isEatenLunch: boolean;
  isEatenDinner: boolean;
  today: number;

  constructor(
    private myMenuService: MyMenuService,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dayService: DayService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    const date = new Date();
    this.today = date.getDay();
    this.dayService.day$.pipe(take(1)).subscribe((day: any) => {
      if (this.today !== day.dayNumber) {
        this.userService.initializeUserIsEatenFood(this.userId);
        this.dayService.changeDayNumber(this.today);
      }
    });

    this.authService.afUser$.subscribe((user: User) => {
      this.isEatenBreakfast = user.isEatenBreakfast;
      this.isEatenLunch = user.isEatenLunch;
      this.isEatenDinner = user.isEatenDinner;
      this.eatCount = user.eatCount;
    });
  }

  increaseEatCount(time: string) {
    const increasedEatCount = ++this.eatCount;
    this.userService.changeEatCount(this.userId, increasedEatCount).then(() => {
      this.snackBar.open('よく頑張りました！', null, {
        duration: 2000,
      });
      this.userService.changeUserIsEatenFood(this.userId, time, true);
    });
  }

  reduceEatCount(time: string) {
    const reducedEatCount = --this.eatCount;
    this.userService.changeEatCount(this.userId, reducedEatCount).then(() => {
      this.snackBar.open('取り消しました！', null, {
        duration: 2000,
      });
      this.userService.changeUserIsEatenFood(this.userId, time, false);
    });
  }

  checkTime(time: string): boolean {
    switch (time) {
      case 'breakfast':
        return this.isEatenBreakfast;
      case 'lunch':
        return this.isEatenLunch;
      case 'dinner':
        return this.isEatenDinner;
    }
  }
}
