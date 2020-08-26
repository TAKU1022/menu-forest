import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostWithFood, Post } from '@interfaces/post';
import { switchMap, tap, take } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { MyMenuService } from 'src/app/services/my-menu.service';
import { MyMenu } from '@interfaces/my-menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post$: Observable<PostWithFood>;
  post: Post;
  userId: string = this.authService.userId;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private myMenuService: MyMenuService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        const postId = param.get('detail');
        return this.postService.getPostById(postId);
      }),
      tap((post: Post) => (this.post = post)),
      switchMap((post: Post) => {
        if (post) {
          return this.postService.getPostWithFoodById(post.postId);
        } else {
          return of(null);
        }
      }),
      tap(() => this.loadingService.toggleLoading(false))
    );
  }

  changeMyMenuToUserMenu(): void {
    this.myMenuService
      .getMyMenuByUserId(this.userId)
      .pipe(take(1))
      .subscribe((myMenu: MyMenu) => {
        this.myMenuService
          .changeMyMenuToUserMenu(myMenu.myMenuId, this.post.day)
          .then(() => {
            this.snackBar.open('この献立をMy献立に登録しました！', null);
            this.router.navigateByUrl('/create-my-menu');
          });
      });
  }

  deletePost(): void {
    this.location.back();
    this.postService.deletePost(this.post.postId).then(() => {
      this.snackBar.open('この投稿を削除しました！', null);
    });
  }
}
