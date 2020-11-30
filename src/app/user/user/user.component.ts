import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { PostWithFoodWithUser } from '@interfaces/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from '@interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private lastPostDocument: firestore.QueryDocumentSnapshot<
    firestore.DocumentData
  >;
  private isInitial = true;

  user$: Observable<User>;
  userPosts: PostWithFoodWithUser[] = [];
  isGotPosts = false;
  isLoading = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private userService: UserService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.getUser();
    this.getUserPosts();
  }

  private getUser(): void {
    this.user$ = this.route.queryParamMap.pipe(
      switchMap((param: ParamMap) => {
        const userId = param.get('id');
        return this.userService.getUserbyId(userId);
      }),
      take(1)
    );
  }

  getUserPosts(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((param: ParamMap) => {
          const userId = param.get('id');
          return this.postService.getUserPosts(userId, this.lastPostDocument);
        }),
        take(1),
        tap(() =>
          this.isInitial ? (this.isLoading = false) : (this.isLoading = true)
        )
      )
      .toPromise()
      .then(({ postsWithFoodWithUser, lastPostDocument }) => {
        if (this.isInitial) {
          this.loadingService.toggleLoading(false);
          this.isGotPosts = true;
        }
        setTimeout(
          () => {
            this.userPosts.push(...postsWithFoodWithUser);
            this.lastPostDocument = lastPostDocument;
            this.isInitial = false;
            this.isLoading = false;
          },
          this.isInitial ? 0 : 1500
        );
      })
      .catch(() => (this.isLoading = false));
  }
}
