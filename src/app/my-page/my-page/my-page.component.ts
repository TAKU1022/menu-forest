import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { PostService } from 'src/app/services/post.service';
import { PostWithFoodWithUser } from '@interfaces/post';
import { take, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { firestore } from 'firebase';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  private userId: string = this.authService.userId;
  private lastPostDocument: firestore.QueryDocumentSnapshot<
    firestore.DocumentData
  >;
  private isInitial = true;

  user$: Observable<User> = this.authService.user$.pipe(
    tap(() => this.loadingService.toggleLoading(false))
  );
  myPosts: PostWithFoodWithUser[] = [];
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private loadingService: LoadingService,
    private titleService: TitleService
  ) {
    this.loadingService.toggleLoading(true);
    this.titleService.setTitle('マイページ');
  }

  ngOnInit(): void {
    this.getMyPosts();
  }

  getMyPosts(): void {
    this.postService
      .getUserPosts(this.userId, this.lastPostDocument)
      .pipe(
        take(1),
        tap((userPost) => {
          this.isLoading = true;
        })
      )
      .toPromise()
      .then(({ postsWithFoodWithUser, lastPostDocument }) => {
        setTimeout(
          () => {
            this.myPosts.push(...postsWithFoodWithUser);
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
