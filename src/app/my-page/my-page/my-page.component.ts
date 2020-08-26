import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { PostService } from 'src/app/services/post.service';
import { PostWithFoodWithUser } from '@interfaces/post';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  userId: string = this.authService.userId;
  userPosts$: Observable<
    PostWithFoodWithUser[]
  > = this.postService.getUserPosts(this.userId);

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {}
}
