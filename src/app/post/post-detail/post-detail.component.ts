import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PostWithFood } from '@interfaces/post';
import { switchMap } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post$: Observable<PostWithFood>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        const postId = param.get('detail');
        return this.postService.getPostWithFoodById(postId);
      })
    );
  }
}
