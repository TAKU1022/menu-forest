import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { DayMenuWithFood, MyMenu } from '@interfaces/my-menu';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Food } from '@interfaces/food';
import { take, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { ChangeMyMenuDialogComponent } from 'src/app/change-my-menu-dialog/change-my-menu-dialog/change-my-menu-dialog.component';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { TutorialService } from 'src/app/services/tutorial.service';
import { User } from '@interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-my-menu',
  templateUrl: './create-my-menu.component.html',
  styleUrls: ['./create-my-menu.component.scss'],
})
export class CreateMyMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  private userId: string = this.authService.userId;
  private subscription: Subscription;
  private user$: Observable<User> = this.authService.user$;

  weekMenu$: Observable<
    DayMenuWithFood[]
  > = this.myMenuService
    .getDayMenuWithFoods(this.userId)
    .pipe(tap(() => this.loadingService.toggleLoading(false)));
  myMenu: MyMenu;

  constructor(
    private authService: AuthService,
    private myMenuService: MyMenuService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private tutorialService: TutorialService,
    private userService: UserService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.getMyMenu();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.startTutorial();
  }

  private startTutorial(): void {
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => {
        if (!user.isCompletedCreateMyMenuTutorial) {
          this.tutorialService.startCreateMyMenuTutorial();
          this.userService.completeTutorial('create-my-menu', this.userId);
        }
      });
  }

  private getMyMenu(): void {
    this.subscription = this.myMenuService
      .getMyMenuByUserId(this.userId)
      .subscribe((myMenu: MyMenu) => (this.myMenu = myMenu));
  }

  openChangeMyMenuDialog(food: Food, dayOfWeek: number, time: string): void {
    this.dialog.open(ChangeMyMenuDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      width: '800px',
      data: {
        myMenu: this.myMenu,
        food,
        dayOfWeek,
        time,
      },
    });
  }

  openPostDialog(weekMenu: DayMenuWithFood[]): void {
    this.dialog.open(PostDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: {
        weekMenu,
        myMenu: this.myMenu,
        userId: this.userId,
      },
    });
  }
}
