import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { PostWithFoodWithUser } from '@interfaces/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userPosts$: Observable<PostWithFoodWithUser[]>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userPosts$ = this.route.queryParamMap.pipe(
      switchMap((param: ParamMap) => {
        const userId = param.get('id');
        return this.postService.getUserPosts(userId);
      })
    );
  }
}
