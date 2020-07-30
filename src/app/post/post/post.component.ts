import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { PostWithFoodWithUser } from '@interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts$: Observable<
    PostWithFoodWithUser[]
  > = this.postService.getPostWithFoodWithUsers();

  constructor(private postService: PostService) {}

  ngOnInit(): void {}
}
