import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { DayMenuWithFood, MyMenu } from '@interfaces/my-menu';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMyMenuDialogComponent } from '../change-my-menu-dialog/change-my-menu-dialog.component';
import { Food } from '@interfaces/food';
import { PostService } from 'src/app/services/post.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openChangeMyMenuDialog(
    myMenuId: string,
    food: Food,
    dayOfWeek: number,
    time: string
  ): void {
    this.dialog.open(ChangeMyMenuDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      minWidth: 320,
      data: {
        myMenuId,
        food,
        dayOfWeek,
        time,
      },
    });
  }

  createPost(): void {
    this.myMenu$.pipe(take(1)).subscribe((myMenu: MyMenu) => {
      this.postService
        .createPost({ day: myMenu.day, creatorId: this.userId })
        .then(() => {
          this.snackBar.open('投稿に成功しました！', null, {
            duration: 3000,
          });
          if (!myMenu.isPosted) {
            this.myMenuService.changeMyMenuIsPosted(myMenu.myMenuId, true);
          }
        });
    });
  }
}
