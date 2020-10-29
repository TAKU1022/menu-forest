import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { PostWithFoodWithUser } from '@interfaces/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from '@interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<User>;
  userPosts$: Observable<PostWithFoodWithUser[]>;

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
      take(1),
      tap(() => this.loadingService.toggleLoading(false))
    );
  }

  private getUserPosts(): void {
    this.userPosts$ = this.route.queryParamMap.pipe(
      switchMap((param: ParamMap) => {
        const userId = param.get('id');
        return this.postService.getUserPosts(userId);
      }),
      take(1)
    );
  }
}
