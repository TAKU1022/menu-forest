import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { TutorialService } from 'src/app/services/tutorial.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  private userId: string = this.authService.userId;
  private eatCount: number;
  private today: number;
  private myMenu: MyMenu;
  private user$: Observable<User> = this.authService.user$;

  todayMenu$: Observable<DayMenuWithFood> = this.myMenuService
    .getTodayMenu(this.userId)
    .pipe(tap(() => this.loadingService.toggleLoading(false)));
  isEatenBreakfast: boolean;
  isEatenLunch: boolean;
  isEatenDinner: boolean;

  constructor(
    private myMenuService: MyMenuService,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dayService: DayService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private tutorialService: TutorialService,
    private titleService: TitleService
  ) {
    this.loadingService.toggleLoading(true);
    this.titleService.setTitle('本日の献立');
  }

  ngOnInit(): void {
    this.resetEatStatus();
    this.getEatStatus();
    this.getMyMenu();
  }

  ngAfterViewInit(): void {
    this.startTutorial();
  }

  private startTutorial(): void {
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => {
        if (user && !user?.isCompletedHomeTutorial) {
          this.tutorialService.startHomeTutorial();
          this.userService.completeTutorial('home', this.userId);
        }
      });
  }

  private resetEatStatus(): void {
    const date = new Date();
    this.today = date.getDay();
    this.dayService.day$
      .pipe(take(1))
      .toPromise()
      .then((day: any) => {
        if (this.today !== day?.dayNumber) {
          this.userService.initializeUserIsEatenFood(this.userId);
          this.dayService.changeDayNumber(this.today);
        }
      });
  }

  private getEatStatus(): void {
    this.user$
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

  openChangeMyMenuDialog(food: Food, time: string): void {
    this.dialog.open(ChangeMyMenuDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      width: '800px',
      data: {
        myMenu: this.myMenu,
        food,
        dayOfWeek: this.today,
        time,
      },
    });
  }
}
