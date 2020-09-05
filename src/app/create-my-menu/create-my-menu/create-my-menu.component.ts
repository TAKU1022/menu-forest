import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { DayMenuWithFood, MyMenu } from '@interfaces/my-menu';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Food } from '@interfaces/food';
import { PostService } from 'src/app/services/post.service';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/services/loading.service';
import { ChangeMyMenuDialogComponent } from 'src/app/change-my-menu-dialog/change-my-menu-dialog/change-my-menu-dialog.component';

@Component({
  selector: 'app-create-my-menu',
  templateUrl: './create-my-menu.component.html',
  styleUrls: ['./create-my-menu.component.scss'],
})
export class CreateMyMenuComponent implements OnInit, OnDestroy {
  private userId: string = this.authService.userId;
  private subscription: Subscription;

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
    private postService: PostService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.getMyMenu();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      minWidth: 320,
      data: {
        myMenu: this.myMenu,
        food,
        dayOfWeek,
        time,
      },
    });
  }

  createPost(): void {
    this.postService
      .createPost({ day: this.myMenu.day, creatorId: this.userId })
      .then(() => {
        this.snackBar.open('投稿に成功しました！', null);
        if (!this.myMenu.isPosted) {
          this.myMenuService.changeMyMenuIsPosted(this.myMenu.myMenuId, true);
        }
      });
  }
}
