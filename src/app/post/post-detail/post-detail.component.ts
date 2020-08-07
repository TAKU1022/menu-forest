import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PostWithFood } from '@interfaces/post';
import { switchMap, tap } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post$: Observable<PostWithFood>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        const postId = param.get('detail');
        return this.postService.getPostWithFoodById(postId);
      }),
      tap(() => this.loadingService.toggleLoading(false))
    );
  }
}
