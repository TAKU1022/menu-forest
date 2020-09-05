import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { PostWithFoodWithUser } from '@interfaces/post';
import { LoadingService } from 'src/app/services/loading.service';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts$: Observable<
    PostWithFoodWithUser[]
  > = this.postService.getPostsWithFoodWithUser().pipe(
    take(1),
    tap(() => this.loadingService.toggleLoading(false))
  );

  constructor(
    private postService: PostService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {}
}
