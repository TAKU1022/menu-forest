import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PostWithFood, Post } from '@interfaces/post';
import { switchMap, tap, take } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { MyMenu } from '@interfaces/my-menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { User } from '@interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { TitleService } from 'src/app/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateMyMenuDialogComponent } from '../update-my-menu-dialog/update-my-menu-dialog.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  private post: Post;
  private myMenu: MyMenu;

  post$: Observable<PostWithFood>;
  userId: string = this.authService.userId;
  user$: Observable<User> = this.authService.user$;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private myMenuService: MyMenuService,
    private snackBar: MatSnackBar,
    private location: Location,
    private userService: UserService,
    private titleService: TitleService,
    private dialog: MatDialog
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.getPostWithFood();
    this.getPost();
    this.getMyMenu();
  }

  private getPostWithFood(): void {
    this.post$ = this.route.paramMap.pipe(
      take(1),
      switchMap((param: ParamMap) => {
        const postId: string = param.get('detail');
        return this.postService.getPostWithFoodById(postId);
      }),
      tap((post: PostWithFood) => {
        this.loadingService.toggleLoading(false);
        this.titleService.setTitle(post.title);
      })
    );
  }

  private getPost(): void {
    this.route.paramMap
      .pipe(
        switchMap((param: ParamMap) => {
          const postId: string = param.get('detail');
          return this.postService.getPostById(postId);
        }),
        take(1)
      )
      .toPromise()
      .then((post: Post) => (this.post = post));
  }

  private getMyMenu(): void {
    this.myMenuService
      .getMyMenuByUserId(this.userId)
      .pipe(take(1))
      .toPromise()
      .then((myMenu: MyMenu) => (this.myMenu = myMenu));
  }

  private reduceUserPostCount(): void {
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => {
        const reducedPostCount = --user.postCount;
        this.userService.changeUserPostCount(this.userId, reducedPostCount);
      });
  }

  openUpdateMyMenuDialog(): void {
    this.dialog.open(UpdateMyMenuDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: {
        myMenuId: this.myMenu.myMenuId,
        postFoods: this.post.day,
      },
    });
  }

  deletePost(): void {
    this.location.back();
    this.postService.deletePost(this.post.postId).then(() => {
      this.snackBar.open('この投稿を削除しました！', null);
      this.reduceUserPostCount();
    });
  }
}
