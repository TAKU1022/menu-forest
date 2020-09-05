import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { PostWithFoodWithUser } from '@interfaces/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userPosts$: Observable<PostWithFoodWithUser[]>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.getUserPosts();
  }

  private getUserPosts(): void {
    this.userPosts$ = this.route.queryParamMap.pipe(
      switchMap((param: ParamMap) => {
        const userId = param.get('id');
        return this.postService.getUserPosts(userId);
      }),
      take(1),
      tap(() => this.loadingService.toggleLoading(false))
    );
  }
}
